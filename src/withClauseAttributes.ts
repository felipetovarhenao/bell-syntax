import * as vscode from "vscode";
export const withClauseAttrCompletions: vscode.CompletionItem[] = [
  { name: "maxdepth", default: 1 },
  { name: "scalarmode", default: 1 },
  { name: "unwrap", default: 0 },
  { name: "recursionmode", default: 0 },
  { name: "spikemode", default: 0 },
].map((attr) => {
  const item = new vscode.CompletionItem(`@${attr.name} ${attr.default}`, vscode.CompletionItemKind.Field);
  item.insertText = new vscode.SnippetString(`${attr.name} `).appendVariable("1", `${attr.default}`);
  item.filterText = attr.name;
  return item;
});
