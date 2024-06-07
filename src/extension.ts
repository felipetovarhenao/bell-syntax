/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from "vscode";
import { nativeFunctionsCompletions, nativeFunctionsLookup } from "./nativeFunctions";

export function activate(context: vscode.ExtensionContext) {

  const hoverProvider = vscode.languages.registerHoverProvider("bell", {
    provideHover(document, position, token) {
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

  const provider1 = vscode.languages.registerCompletionItemProvider("bell", {
    provideCompletionItems(
      document: vscode.TextDocument,
      position: vscode.Position,
      token: vscode.CancellationToken,
      context: vscode.CompletionContext
    ) {
      const forLoopCompletion = new vscode.CompletionItem("For loop");
      forLoopCompletion.insertText = new vscode.SnippetString("for $${1|i|} in $${2} ${3|collect,do|} (${4});");

      // return all completion items as array
      return [...nativeFunctionsCompletions, forLoopCompletion];
    },
  });

  context.subscriptions.push(provider1, hoverProvider);
}
