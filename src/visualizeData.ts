import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import LLLLParser from "./LLLLParser";
export default function visualizeData(context: vscode.ExtensionContext) {
  const document: vscode.TextDocument | undefined = vscode.window.activeTextEditor?.document;
  if (!document) {
    return;
  }

  const docText = document.getText();
  const parser = new LLLLParser(docText);
  const parsedData = parser.parse();

  // Create the webview panel
  const panel = vscode.window.createWebviewPanel("dataVisualizer", "Data Visualizer", vscode.ViewColumn.One, {
    enableScripts: true,
  });

  // Get the path to the HTML file
  const htmlFilePath = path.join(context.extensionPath, "html", "webview.html");

  // Read HTML from the external file
  fs.readFile(htmlFilePath, "utf8", (err, data) => {
    if (err) {
      vscode.window.showErrorMessage("Could not load the webview HTML file.");
      return;
    }

    panel.webview.html = data; // Set HTML content from file
    panel.webview.postMessage(parsedData);
  });
}
