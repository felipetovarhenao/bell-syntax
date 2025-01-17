import * as vscode from "vscode";
import { nativeFunctionsCompletions } from "./nativeFunctions";
import { loopSnippets } from "./loopSnippets";

const completionProvider = vscode.languages.registerCompletionItemProvider(
  "bell",
  {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
      const range = document.getWordRangeAtPosition(position);

      if (!range) {
        return undefined;
      }

      const start = range.start.character;
      const prefix = document.lineAt(position).text.slice(start - 1, start);

      // stop early if token is not a global variable
      if (/[$#@]/.test(prefix)) {
        return undefined;
      }

      return [...nativeFunctionsCompletions, ...loopSnippets];
    },
  },
  "."
);

export default completionProvider;
