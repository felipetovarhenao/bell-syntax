/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from "vscode";
import { nativeFunctionsCompletions, nativeFunctionsLookup } from "./nativeFunctions";

export function activate(context: vscode.ExtensionContext) {
  const hoverProvider = vscode.languages.registerHoverProvider("bell", {
    provideHover(document: vscode.TextDocument, position: vscode.Position) {
      const range = document.getWordRangeAtPosition(position);
      const word = document.getText(range);
      const result = nativeFunctionsLookup[word];
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

        return [...nativeFunctionsCompletions];
      },
    },
    "."
  );

  const attrCompletionProvider = vscode.languages.registerCompletionItemProvider(
    "bell",
    {
      provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
        const linePrefix = document.lineAt(position).text.slice(0, position.character);
        const regex = /(?<=\()\w+/;
        const match = linePrefix.split("").reverse().join("").match(regex);

        if (match && match[0]) {
          const token = match[0].split("").reverse().join("");
          const result = nativeFunctionsLookup[token];
          if (!result) {
            return undefined;
          }
          return result.args;
        }
        return undefined;
      },
    },
    "@"
  );

  context.subscriptions.push(completionProvider, hoverProvider, attrCompletionProvider);
}
