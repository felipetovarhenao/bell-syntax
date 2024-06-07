/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from "vscode";
import { nativeFunctionsCompletions } from "./nativeFunctions";

export function activate(context: vscode.ExtensionContext) {
  console.log("**** activating");
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

  context.subscriptions.push(provider1);
}
