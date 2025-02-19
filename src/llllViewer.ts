import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import LLLLParser from "./LLLLParser";

const llllViewer = vscode.commands.registerCommand("extension.visualizeData", () => {
  const document: vscode.TextDocument | undefined = vscode.window.activeTextEditor?.document;
  if (!document) {
    return;
  }

  const docText = document.getText();
  const parser = new LLLLParser(docText);
  const parsedData = parser.parse();

  // Create the webview panel
  const panel = vscode.window.createWebviewPanel("dataVisualizer", document.fileName, vscode.ViewColumn.One, {
    enableScripts: true,
  });

  // Get the extension directory path
  const extensionPath = vscode.extensions.getExtension("bell-syntax")?.extensionPath; // Replace with your extension ID
  if (!extensionPath) {
    vscode.window.showErrorMessage("Could not locate extension path.");
    return;
  }

  // Read HTML from the external file
  const htmlFilePath = path.join(extensionPath, "html", "webview.html");
  fs.readFile(htmlFilePath, "utf8", (err, data) => {
    if (err) {
      vscode.window.showErrorMessage("Could not load the webview HTML file.");
      return;
    }

    panel.webview.html = data; // Set HTML content from file

    // Send the parsed data to the webview
    panel.webview.postMessage(parsedData);
  });
});

export default llllViewer;
