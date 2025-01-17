import * as vscode from "vscode";
import { nativeFunctionsLookup } from "./nativeFunctions";
import { loopSnippetLookup } from "./loopSnippets";

const hoverProvider = vscode.languages.registerHoverProvider("bell", {
  provideHover(document: vscode.TextDocument, position: vscode.Position) {
    const range = document.getWordRangeAtPosition(position);
    const word = document.getText(range);
    const result = nativeFunctionsLookup[word] || loopSnippetLookup[word];
    if (!result) {
      return undefined;
    }
    return {
      contents: [result.completion.documentation],
    };
  },
});

export default hoverProvider;
