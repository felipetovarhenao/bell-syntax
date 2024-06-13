/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from "vscode";
import { nativeFunctionsCompletions, nativeFunctionsLookup } from "./nativeFunctions";
import { loopSnippets, loopSnippetLookup } from "./loopSnippets";
import { withClauseAttrCompletions } from "./withClauseAttributes";
import parseCode, { replaceTree } from "./bellParser";

export function activate(context: vscode.ExtensionContext) {
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

  const formatter = vscode.languages.registerDocumentFormattingEditProvider("bell", {
    provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
      const rawText = document.getText().trim();
      // .trim()
      // .replace(/((?<!†)##.*(?!†))/g, "†$1†")
      // .replace(/((\\r|\\n)+)/g, " ")
      // .replace(/(?<!†)((#\(([\s\S]*?)\)#)|("([\s\S]*?)")|('([\s\S]*?)'))(?!†)/gm, "†$1†");
      const tree = parseCode(rawText);
      const start = new vscode.Position(0, 0);
      const end = new vscode.Position(document.lineCount, document.lineAt(document.lineCount - 1).range.end.character);
      const range = new vscode.Range(start, end);
      const replace = replaceTree(tree);
      return [vscode.TextEdit.replace(range, JSON.stringify(tree, null, 2))];
    },
  });

  context.subscriptions.push(completionProvider, hoverProvider, attrCompletionProvider, formatter);
}
