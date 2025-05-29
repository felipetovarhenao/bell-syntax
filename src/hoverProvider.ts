import * as vscode from "vscode";
import { nativeFunctionsLookup } from "./nativeFunctions";
import { loopSnippetLookup } from "./loopSnippets";
import BreakpointParser from "./BreakpointParser";
import findDocString from "./findDocString";

const regex = /(\[\s*(-?\d+(\.\d+)?(\/-?\d+(\.\d+)?)?\s+-?\d+(\.\d+)?(\/-?\d+(\.\d+)?)?\s+-?\d+(\.\d+)?(\/-?\d+(\.\d+)?)?)\s*\]\s*){2,}/g;

const hoverProvider = vscode.languages.registerHoverProvider("bell", {
  provideHover(document: vscode.TextDocument, position: vscode.Position) {
    const range = document.getWordRangeAtPosition(position);
    const word = range ? document.getText(range) : "";

    // Check if the word exists in native function lookup
    const result = nativeFunctionsLookup[word] || loopSnippetLookup[word];
    if (result) {
      return new vscode.Hover(result.completion.documentation);
    } else {
      const docString = findDocString(document, word);
      if (docString) {
        return docString;
      }
    }

    // Extract the entire line where the cursor is located
    const lineText = document.lineAt(position.line).text;
    let match;

    while ((match = regex.exec(lineText)) !== null) {
      const matchStart = match.index;
      const matchEnd = matchStart + match[0].length;

      // Check if the cursor is within this match range
      if (position.character >= matchStart && position.character <= matchEnd) {
        const parser = new BreakpointParser(match[0]);
        const svg = parser.toSvgBase64();
        const markdown = new vscode.MarkdownString();
        markdown.appendMarkdown(`**breakpoint function:**\n\n`);
        markdown.appendMarkdown(`![BPF Graph](${svg})`);
        return new vscode.Hover(markdown);
      }
    }

    return undefined;
  },
});

export default hoverProvider;
