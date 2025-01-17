import * as vscode from "vscode";

/**
 * Checks a Bell document for unused local variables and sets diagnostics accordingly.
 */
export default function updateDiagnostics(document: vscode.TextDocument, collection: vscode.DiagnosticCollection) {
  // Only operate on bell language documents
  if (document.languageId !== "bell") {
    return;
  }

  const text = document.getText();

  // We'll collect definitions and usages in two passes.
  // definitionsMap stores an array of all definitions (line, variableName, range, used=false)
  interface DefinitionInfo {
    line: number;
    variable: string;
    range: vscode.Range;
    used: boolean;
  }
  const definitionsMap = new Map<string, DefinitionInfo[]>();

  // 1. Find all definitions: lines where `$varName = ...` or `$varName=...`
  //    For each definition, store: the line, the name, and the range for highlighting
  const definitionRegex = /\$([A-Za-z]([A-Za-z0-9_]*)?[A-Za-z0-9]*)\s*=/g;

  const lines = text.split(/\r?\n/);
  lines.forEach((lineText, lineIndex) => {
    let match: RegExpExecArray | null;
    definitionRegex.lastIndex = 0; // reset regex index before each new line
    while ((match = definitionRegex.exec(lineText)) !== null) {
      const varName = match[1];
      const startPos = match.index;
      const endPos = startPos + match[0].length - 1; // end position of `$varName`

      const range = new vscode.Range(new vscode.Position(lineIndex, startPos), new vscode.Position(lineIndex, endPos));

      // Initialize if necessary
      if (!definitionsMap.has(varName)) {
        definitionsMap.set(varName, []);
      }

      // Add this definition to the list
      definitionsMap.get(varName)!.push({
        line: lineIndex,
        variable: varName,
        range,
        used: false,
      });
    }
  });

  // 2. Find all usages
  //    Then mark the closest preceding definition (if any) as used.
  const usageRegex = /\$([A-Za-z]([A-Za-z0-9_]*)?[A-Za-z0-9]*)/g;

  lines.forEach((lineText, lineIndex) => {
    let match: RegExpExecArray | null;
    usageRegex.lastIndex = 0;
    while ((match = usageRegex.exec(lineText)) !== null) {
      const varName = match[1];
      // If we have a definition for varName, attempt to find the last definition
      // whose line is strictly less than or equal to lineIndex.
      // (We interpret “used after definition” as usage on a later line or
      // on the same line if it was previously defined on an earlier line.)
      if (definitionsMap.has(varName)) {
        const definitionArray = definitionsMap.get(varName)!;
        // Find the closest definition that is on or before lineIndex
        // and that is not overshadowed by a later definition.
        // We'll do a simple right-to-left iteration:
        for (let i = definitionArray.length - 1; i >= 0; i--) {
          const def = definitionArray[i];
          // Mark it used if it is strictly *before* this usage line
          // or if it is on the same line but occurs earlier in the line
          // (depending on your exact requirement, you can tailor this logic)
          if (def.line < lineIndex || (def.line === lineIndex && def.range.end.character < match.index)) {
            def.used = true;
            break;
          }
        }
      }
    }
  });

  // 3. Any definitions that remain `used === false` should produce a diagnostic
  const diagnostics: vscode.Diagnostic[] = [];
  for (const [_, definitionArray] of definitionsMap.entries()) {
    for (const def of definitionArray) {
      if (!def.used) {
        // Create a diagnostic that warns about unused variable
        const diagnostic: vscode.Diagnostic = {
          message: `local variable ${def.variable} is never used.`,
          severity: vscode.DiagnosticSeverity.Hint,
          range: def.range,
          source: "bell-unused-variable",
        };
        diagnostics.push(diagnostic);
      }
    }
  }

  // 4. Finally, update the diagnostic collection for this document
  collection.set(document.uri, diagnostics);
}

export const diagnosticCollection = vscode.languages.createDiagnosticCollection("bell");
