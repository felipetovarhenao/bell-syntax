/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from "vscode";
import updateDiagnostics, { diagnosticCollection } from "./updateDiagnostics";
import hoverProvider from "./hoverProvider";
import completionProvider from "./completionProvider";
import attrCompletionProvider from "./attrCompletionProvider";
import formatter from "./formatter";
import bellDefinitionProvider from "./bellDefinitionProvider";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(completionProvider, hoverProvider, attrCompletionProvider, formatter, diagnosticCollection, bellDefinitionProvider);

  // Listen for events on bell documents
  vscode.workspace.onDidOpenTextDocument((doc) => updateDiagnostics(doc, diagnosticCollection), null, context.subscriptions);
  vscode.workspace.onDidChangeTextDocument((event) => updateDiagnostics(event.document, diagnosticCollection), null, context.subscriptions);
  vscode.workspace.onDidCloseTextDocument((doc) => diagnosticCollection.delete(doc.uri), null, context.subscriptions);

  // Check all documents already open in the workspace (optional convenience)
  vscode.workspace.textDocuments.forEach((doc) => {
    updateDiagnostics(doc, diagnosticCollection);
  });
}
