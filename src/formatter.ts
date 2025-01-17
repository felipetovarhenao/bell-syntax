import * as vscode from "vscode";
import parseCode from "./bellParser";
import formatTree from "./formatTree";

const formatter = vscode.languages.registerDocumentFormattingEditProvider("bell", {
  provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
    const rawText = document.getText().trim();
    const tree = parseCode(rawText);
    const start = new vscode.Position(0, 0);
    const end = new vscode.Position(document.lineCount, document.lineAt(document.lineCount - 1).range.end.character);
    const range = new vscode.Range(start, end);
    const replace = formatTree(tree).trim();
    return [vscode.TextEdit.replace(range, replace)];
  },
});
export default formatter;
