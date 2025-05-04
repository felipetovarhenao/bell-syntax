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

  // Regex patterns:
  // - `definitionRegex`: matches local variable definitions (starting with $)
  // - `globalDefinitionRegex`: matches global variable definitions (no prefix)
  // - `usageRegex`: matches variable usages (starting with $)
  const definitionRegex = /\$([A-Za-z]([A-Za-z0-9_]*)?[A-Za-z0-9]*)\s*(?=(=(?!=)|[^,;]*\bin\b|[^;]*->))/g;
  const globalDefinitionRegex = /(?<![#$])([A-Za-z]([A-Za-z0-9_]*)?[A-Za-z0-9]*)\s*(?=(=[^=]))/g;
  const usageRegex = /\$([A-Za-z]([A-Za-z0-9_]*)?[A-Za-z0-9]*)/g;
  const reservedKeywordRegex = /\$(d?[xo]|f|l|i|r|p)[0-9]+/;

  const lines = text.split(/\r?\n/);

  // Reset completion arrays
  localVariableCompletions.length = 0;
  globalVariableCompletions.length = 0;

  // Step 1: Find all variable definitions in the document
  lines.forEach((lineText, lineIndex) => {
    let match: RegExpExecArray | null;

    // Match global definitions and populate completions
    globalDefinitionRegex.lastIndex = 0;
    while ((match = globalDefinitionRegex.exec(lineText)) !== null) {
      const varName = match[1];
      globalVariableCompletions.push(new vscode.CompletionItem(`${varName}`, vscode.CompletionItemKind.Constant));
    }

    // Match local definitions and track them in the definitions map
    definitionRegex.lastIndex = 0;
    while ((match = definitionRegex.exec(lineText)) !== null) {
      const varName = match[1];
      // Skip reserved/special variable names
      if (/^(?:(([lipfr]|d?[xo])\d+)|args|argcount)$/.test(varName)) {
        continue;
      }

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

  // Step 2: Find all variable usages and mark corresponding definitions as used
  const diagnostics: vscode.Diagnostic[] = [];
  const usedVariables = new Set<string>();

  lines.forEach((lineText, lineIndex) => {
    let match: RegExpExecArray | null;
    usageRegex.lastIndex = 0;
    while ((match = usageRegex.exec(lineText)) !== null) {
      const varName = match[1];
      if (!varName.match(reservedKeywordRegex)) {
        continue;
      }

      usedVariables.add(varName);

      // If the variable is defined, mark the correct definition as used
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

  // Step 3: Create diagnostics for unused variables
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

  // Step 4: Warn about variables that are used but never defined
  for (const varName of usedVariables) {
    // Skip if it's a special/reserved variable
    if (!definitionsMap.has(varName) && !/\$(?:(([lipfr]|d?[xo])\d+)|args|argcount)\b/.test(`$${varName}`)) {
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

  // Step 5: Update the diagnostic collection with generated diagnostics
  collection.set(document.uri, diagnostics);
}

// Completion items for local and global variables, exposed for use in other parts of the extension
const localVariableCompletions: vscode.CompletionItem[] = [];
const globalVariableCompletions: vscode.CompletionItem[] = [];

// Diagnostic collection for "bell" language diagnostics
const diagnosticCollection = vscode.languages.createDiagnosticCollection("bell");

// Exported symbols
export { localVariableCompletions, diagnosticCollection, globalVariableCompletions };
