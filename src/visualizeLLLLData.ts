import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import LLLLParser from "./LLLLParser";

/**
 * visualizeLLLLData - A function to parse active text document data and visualize it in a webview panel.
 * @param {vscode.ExtensionContext} context - The extension context, used to access resources and manage lifecycle events.
 */
export default function visualizeLLLLData(context: vscode.ExtensionContext) {
  // Get the currently active text document in the editor
  const document: vscode.TextDocument | undefined = vscode.window.activeTextEditor?.document;
  if (!document) {
    return; // Exit if no document is open
  }

  // Extract the text content of the document
  const docText = document.getText();

  // Parse the document content using LLLLParser
  const parser = new LLLLParser(docText);
  const parsedData = parser.parse();

  // Create a new webview panel to display the parsed data
  const panel = vscode.window.createWebviewPanel(
    "dataVisualizer", // Unique identifier for the panel
    path.basename(document.fileName), // Title of the panel
    vscode.ViewColumn.One, // Display in the first column
    { enableScripts: true } // Enable JavaScript in the webview
  );

  // Set the icon for the webview panel
  panel.iconPath = vscode.Uri.file(path.join(context.extensionPath, "images", "llll.svg"));

  // Construct the file path to the HTML file used for rendering the webview
  const htmlFilePath = path.join(context.extensionPath, "html", "webview.html");

  // Read the HTML content from the external file
  fs.readFile(htmlFilePath, "utf8", (err, data) => {
    if (err) {
      // Display an error message if the HTML file cannot be loaded
      vscode.window.showErrorMessage("Could not load the webview HTML file.");
      return;
    }

    // Set the webview's HTML content from the loaded file
    panel.webview.html = data;

    // Send the parsed data to the webview using postMessage
    panel.webview.postMessage(parsedData);
  });
}
