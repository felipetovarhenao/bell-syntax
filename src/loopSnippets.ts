import * as vscode from "vscode";

const forLoopExamples = [
  "## for...collect loop\nfor $var in $llll collect (\n\t## body\n)",
  "## for...do loop with address loop\nfor $var $addr in $llll do (\n\t## body\n)",
  "## for...collect loop with parallel iteration loop\nfor $var1 in $llll1, $var2 in $lll1 collect (\n\t## body\n)",
  "## for...do loop with 'with' clause\nfor $var in $llll with @unwrap 1 @maxdepth 1 do (\n\t## body\n)",
  "## for...collect loop with 'as' clause\nfor $var in $llll as $boolcondition collect (\n\t## body\n)",
].join(";\n\n");

const whileLoopExamples = [
  "## while...do loop\nwhile $a < $b do (\n\t## body\n)",
  "## while...collect loop\nwhile $a == $b collect (\n\t## body\n)",
].join(";\n\n");

export const loopSnippetLookup: any = {};

export const loopSnippets: vscode.CompletionItem[] = [
  {
    name: "for loop",
    filter: "for",
    snippet: "for \$${1|i|} in ${2|1...10|} ${3|collect,do|} (${4});\n",
    docs: "`for` loops iterate over lllls. Typical examples of `for` loop syntax include:\n" + "```bell\n\n" + forLoopExamples + "\n```",
  },
  {
    name: "while loop",
    filter: "while",
    snippet: "while ${1} ${3|collect,do|} (${4});\n",
    docs:
      "`while` loops repeatedly evaluate the code inside the loop's body as long as a given condition is true. Typical examples of `while` loop syntax include:\n" +
      "```bell\n\n" +
      whileLoopExamples +
      "\n```",
  },
].map((x) => {
  const item = new vscode.CompletionItem(x.name, vscode.CompletionItemKind.Keyword);
  item.insertText = new vscode.SnippetString(x.snippet);
  item.filterText = x.filter;
  item.detail = "bell loop";
  item.documentation = new vscode.MarkdownString(x.docs);

  loopSnippetLookup[x.filter] = {
    completion: item,
  };

  return item;
});
