import * as vscode from "vscode";

class BellDefinitionProvider implements vscode.DefinitionProvider {
  async provideDefinition(document: vscode.TextDocument, position: vscode.Position): Promise<vscode.Location | vscode.Location[] | undefined> {
    const wordRange = document.getWordRangeAtPosition(position, /(\$?[a-zA-Z]([A-Za-z0-9_]*)?[A-Za-z0-9]*)/);
    if (!wordRange) {
      return undefined;
    }

    const variableName = document.getText(wordRange);
    const text = document.getText();

    // Determine if this is a global or local variable
    const isLocal = variableName.startsWith("$");

    // Find the first assignment in the document
    const regex = isLocal
      ? new RegExp(`\\${variableName}\\s*=`, "g") // Local variable assignment
      : new RegExp(`\\b(?<!\\$)${variableName}\\b\\s*=`, "g"); // Global variable assignment

    let match: RegExpExecArray | null;
    while ((match = regex.exec(text))) {
      const matchPosition = document.positionAt(match.index);

      // Ensure the assignment is within the current document
      if (matchPosition.line !== position.line || matchPosition.character !== position.character) {
        const location = new vscode.Location(document.uri, matchPosition);
        return location; // Jump to the first occurrence
      }
    }

    return undefined;
  }
}
const bellDefinitionProvider = vscode.languages.registerDefinitionProvider({ language: "bell", scheme: "file" }, new BellDefinitionProvider());

export default bellDefinitionProvider;
