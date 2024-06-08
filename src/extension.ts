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
        contents: [result.documentation],
      };
    },
  });

  const completionProvider = vscode.languages.registerCompletionItemProvider("bell", {
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
  });

  context.subscriptions.push(completionProvider, hoverProvider);
}
