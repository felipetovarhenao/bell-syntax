import * as vscode from "vscode";
import { nativeFunctionsLookup } from "./nativeFunctions";
import { withClauseAttrCompletions } from "./withClauseAttributes";
import findUnclosedParens from "./findFunctionName";

const attrCompletionProvider = vscode.languages.registerCompletionItemProvider(
  "bell",
  {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
      const linePrefix = document.lineAt(position).text.slice(0, position.character);

      // we only want to show completions if @ is preceded by spaces or alpha + parens
      const cleanAttrPattern = /(?<=(\w+\(|\s+))@$/;
      const isCleanAttr = cleanAttrPattern.test(linePrefix);

      // stop early
      if (!isCleanAttr) {
        return;
      }

      const withPattern = /(?<=with\s+.*)@$/;
      const isWithAttr = withPattern.test(linePrefix);

      if (isWithAttr) {
        // show with clause attributes
        return withClauseAttrCompletions;
      }

      const code = document.getText(new vscode.Range(new vscode.Position(0, 0), position));
      let token = findUnclosedParens(code, code.length);

      if (token) {
        // if matched, reverse back
        let isDotted = token.startsWith(".");

        // check if function is using dotted syntax and remove dot
        if (isDotted) {
          token = token.slice(1);
        }

        // check if it exists
        const result = nativeFunctionsLookup[token];
        if (!result) {
          return undefined;
        }

        // remove first argument for dotted syntax
        return isDotted ? result.args.slice(1) : result.args;
      }
      return undefined;
    },
  },
  "@"
);
export default attrCompletionProvider;
