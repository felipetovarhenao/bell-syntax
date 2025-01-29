import * as vscode from "vscode";

/**
 * Checks a Bell document for unused local variables and sets diagnostics accordingly.
 * Also shows warnings for used variables that are not defined.
 */
export default function updateDiagnostics(document: vscode.TextDocument, collection: vscode.DiagnosticCollection) {
  // Only operate on bell language documents
  if (document.languageId !== "bell") {
    return;
  }

  const text = document.getText();

  // Definitions map to track all variable definitions
  interface DefinitionInfo {
    line: number;
    variable: string;
    range: vscode.Range;
    used: boolean;
  }
  const definitionsMap = new Map<string, DefinitionInfo[]>();

  // Regex patterns for definitions and usages
  const definitionRegex = /\$([A-Za-z]([A-Za-z0-9_]*)?[A-Za-z0-9]*)\s*(?=(=(?!=)|[^,;]*\bin\b|[^;]*->))/g;
  const globalDefinitionRegex = /(?<![#$])([A-Za-z]([A-Za-z0-9_]*)?[A-Za-z0-9]*)\s*(?=(=[^=]))/g;
  const usageRegex = /\$([A-Za-z]([A-Za-z0-9_]*)?[A-Za-z0-9]*)/g;

  const lines = text.split(/\r?\n/);
  localVariableCompletions.length = 0;
  globalVariableCompletions.length = 0;
  // Step 1: Find all definitions
  lines.forEach((lineText, lineIndex) => {
    let match: RegExpExecArray | null;
    globalDefinitionRegex.lastIndex = 0;
    while ((match = globalDefinitionRegex.exec(lineText)) !== null) {
      const varName = match[1];
      globalVariableCompletions.push(new vscode.CompletionItem(`${varName}`, vscode.CompletionItemKind.Constant));
    }
    definitionRegex.lastIndex = 0;
    while ((match = definitionRegex.exec(lineText)) !== null) {
      const varName = match[1];
      const startPos = match.index;
      const endPos = startPos + match[0].length - 1;
      localVariableCompletions.push(new vscode.CompletionItem(`$${varName}`, vscode.CompletionItemKind.Variable));
      const range = new vscode.Range(new vscode.Position(lineIndex, startPos), new vscode.Position(lineIndex, endPos));

      if (!definitionsMap.has(varName)) {
        definitionsMap.set(varName, []);
      }

      definitionsMap.get(varName)!.push({
        line: lineIndex,
        variable: varName,
        range,
        used: false,
      });
    }
  });

  // Step 2: Find all usages and mark definitions as used
  const diagnostics: vscode.Diagnostic[] = [];
  const usedVariables = new Set<string>(); // Track all used variable names

  lines.forEach((lineText, lineIndex) => {
    let match: RegExpExecArray | null;
    usageRegex.lastIndex = 0;
    while ((match = usageRegex.exec(lineText)) !== null) {
      const varName = match[1];
      usedVariables.add(varName);

      if (definitionsMap.has(varName)) {
        const definitionArray = definitionsMap.get(varName)!;

        for (let i = definitionArray.length - 1; i >= 0; i--) {
          const def = definitionArray[i];
          if (def.line < lineIndex || (def.line === lineIndex && def.range.end.character < match.index)) {
            def.used = true;
            break;
          }
        }
      }
    }
  });

  // Step 3: Warn about unused definitions
  for (const [_, definitionArray] of definitionsMap.entries()) {
    for (const def of definitionArray) {
      if (!def.used) {
        const diagnostic: vscode.Diagnostic = {
          message: `Local variable '\$${def.variable}' is defined but never used.`,
          severity: vscode.DiagnosticSeverity.Hint,
          range: def.range,
          source: "bell-unused-variable",
        };
        diagnostics.push(diagnostic);
      }
    }
  }

  // Step 4: Warn about used variables not in definitionsMap
  for (const varName of usedVariables) {
    if (!definitionsMap.has(varName)) {
      lines.forEach((lineText, lineIndex) => {
        let match: RegExpExecArray | null;
        usageRegex.lastIndex = 0;
        while ((match = usageRegex.exec(lineText)) !== null) {
          if (match[1] === varName) {
            const startPos = match.index;
            const endPos = startPos + match[0].length;

            const range = new vscode.Range(new vscode.Position(lineIndex, startPos), new vscode.Position(lineIndex, endPos));
            const diagnostic: vscode.Diagnostic = {
              message: `Variable '\$${varName}' is possibly undefined.`,
              severity: vscode.DiagnosticSeverity.Warning,
              range,
              source: "bell-undefined-variable",
            };
            diagnostics.push(diagnostic);
          }
        }
      });
    }
  }

  // Step 5: Update the diagnostic collection
  collection.set(document.uri, diagnostics);
}

const localVariableCompletions: vscode.CompletionItem[] = [];
const globalVariableCompletions: vscode.CompletionItem[] = [];
const diagnosticCollection = vscode.languages.createDiagnosticCollection("bell");
export { localVariableCompletions, diagnosticCollection, globalVariableCompletions };
