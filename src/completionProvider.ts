import * as vscode from "vscode";
import { nativeFunctionsCompletions } from "./nativeFunctions";
import { loopSnippets } from "./loopSnippets";
import { globalVariableCompletions, localVariableCompletions } from "./updateDiagnostics";
import uniqueBy from "./uniqueBy";

const completionProvider = vscode.languages.registerCompletionItemProvider(
  "bell",
  {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
      const range = document.getWordRangeAtPosition(position);

      if (!range) {
        return undefined;
      }

      const start = range.start.character;
      const end = range.end.character;
      const token = document.lineAt(position).text.slice(start, end);
      // stop early if token is not a global variable
      if (/[\$#@]/.test(token)) {
        return [...uniqueBy(localVariableCompletions, (x) => x.label)];
      }

      return [...nativeFunctionsCompletions, ...loopSnippets, ...globalVariableCompletions];
    },
  },
  "."
);

export default completionProvider;
