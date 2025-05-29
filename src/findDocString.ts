import * as vscode from "vscode";

export default function findDocString(document: vscode.TextDocument, word: string, maxLines: number = 20): vscode.Hover | null {
  // Check if the word is defined elsewhere in the document
  const docText = document.getText();
  const defRegex = new RegExp(`\)#\\s*${word}\\s*=`, "m");

  const defMatch = docText.match(defRegex);
  if (defMatch) {
    const defIndex = defMatch.index ?? -1;
    if (defIndex >= 0) {
      // Get the position of the start of the match
      const defPosition = document.positionAt(defIndex);

      // Look upward from the definition to find a docstring block
      const maxLinesToScan = maxLines; // avoid scanning the whole file
      for (let i = defPosition.line - 1; i >= Math.max(0, defPosition.line - maxLinesToScan); i--) {
        const line = document.lineAt(i).text.trim();
        if (line === ")#") {
          let docLines: string[] = [];
          for (let j = i - 1; j >= 0; j--) {
            const docLine = document.lineAt(j).text.trim();
            if (docLine === "#(") {
              docLines.reverse();
              const markdown = new vscode.MarkdownString(docLines.join("\n"));
              markdown.supportHtml = false;
              return new vscode.Hover(markdown);
            } else {
              docLines.push(docLine);
            }
          }
          break; // If we hit ")#" but can't find "#(", stop
        } else if (line !== "" && !line.startsWith("#")) {
          break; // If we hit non-doc comment or code, stop
        }
      }
    }
  }
  return null;
}
