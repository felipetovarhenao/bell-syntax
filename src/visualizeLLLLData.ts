import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import LLLLParser from "./LLLLParser";

/**
 * Stores active webview panels associated with their document file paths.
 */
const activePanels = new Map<string, vscode.WebviewPanel>();

/**
 * visualizeLLLLData - A function to parse active text document data and visualize it in a webview panel.
 * @param {vscode.ExtensionContext} context - The extension context, used to access resources and manage lifecycle events.
 */
export default function visualizeLLLLData(context: vscode.ExtensionContext) {
  // Get the currently active text document in the editor
  const document: vscode.TextDocument | undefined = vscode.window.activeTextEditor?.document;
  if (!document) {
    vscode.window.showWarningMessage("No active document to visualize.");
    return;
  }

  const filePath = document.uri.fsPath;

  // Check if there's already an open panel for this file
  if (activePanels.has(filePath)) {
    const existingPanel = activePanels.get(filePath);
    if (existingPanel) {
      existingPanel.reveal(vscode.ViewColumn.One); // Bring existing panel to front
    }
    return;
  }

  // Extract the text content of the document
  const docText = document.getText();
  const parser = new LLLLParser(docText);
  const parsedData = parser.parse();

  // Create a new webview panel
  const panel = vscode.window.createWebviewPanel(
    "dataVisualizer",
    path.basename(document.fileName),
    vscode.ViewColumn.One,
    { enableScripts: true, retainContextWhenHidden: true } // Retain context when switching tabs
  );

  panel.iconPath = vscode.Uri.file(path.join(context.extensionPath, "images", "llll.svg"));

  // Store panel reference in map
  activePanels.set(filePath, panel);

  // Load the HTML content
  const htmlFilePath = path.join(context.extensionPath, "html", "webview.html");
  fs.readFile(htmlFilePath, "utf8", (err, data) => {
    if (err) {
      vscode.window.showErrorMessage("Could not load the webview HTML file.");
      return;
    }

    panel.webview.html = data;
    panel.webview.postMessage(parsedData);
  });

  // Handle panel disposal
  panel.onDidDispose(() => {
    activePanels.delete(filePath); // Remove from tracking map
  });
}
