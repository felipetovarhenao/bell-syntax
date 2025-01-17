import * as vscode from "vscode";
import { nativeFunctionsLookup } from "./nativeFunctions";
import { withClauseAttrCompletions } from "./withClauseAttributes";

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

      /* 
        if it's not clean, or a with clause attribute we use regex pattern for a reversed function, so as to catch the most recent function.
        this might cause some issues but in general works well
        */
      const regex = /(?<=\()\w+\.?/;

      // reverse line prefix and apply regex
      const match = linePrefix.split("").reverse().join("").match(regex);

      if (match && match[0]) {
        // if matched, reverse back
        let token = match[0].split("").reverse().join("");
        let isDotted = false;

        // check if function is using dotted syntax and remove dot
        if (token.startsWith(".")) {
          token = token.slice(1);
          isDotted = true;
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
