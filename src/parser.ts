import * as vscode from "vscode";

type NodeType = "singlequote" | "doublequote" | "bracket" | "parens" | "curly" | "substring" | "root" | "deadcode";

interface TreeNode {
  type: NodeType;
  start: number;
  end: number;
  children?: TreeNode[];
  substring?: string;
}

export default function parseSubstrings(input: string): TreeNode {
  function parse(start: number, end: number): TreeNode[] {
    const nodes: TreeNode[] = [];
    let i = start;

    while (i <= end) {
      if (input[i] === "{" || input[i] === "[" || input[i] === "(" || input[i] === '"' || input[i] === "'" || input[i] == "†") {
        let type: NodeType = "substring";
        let closeChar: string = "";
        switch (input[i]) {
          case "†":
            type = "deadcode";
            closeChar = "†";
            break;
          case "{":
            type = "curly";
            closeChar = "}";
            break;
          case "[":
            type = "bracket";
            closeChar = "]";
            break;
          case "(":
            type = "parens";
            closeChar = ")";
            break;
          case '"':
            type = "doublequote";
            closeChar = '"';
            break;
          case "'":
            type = "singlequote";
            closeChar = "'";
            break;
        }

        const openIndex = i;
        let closeIndex = findMatchingBracket(i, closeChar);

        if (closeIndex !== -1) {
          let children = undefined;
          let substring = undefined;
          if (type !== "deadcode") {
            children = parse(openIndex + 1, closeIndex - 1);
          } else {
            substring = input.slice(openIndex + 1, closeIndex);
          }
          nodes.push({
            type,
            start: openIndex,
            end: closeIndex,
            children,
            substring,
          });
          i = closeIndex + 1;
        } else {
          i++;
        }
      } else {
        let startIndex = i;
        while (i <= end && input[i] !== "{" && input[i] !== "[" && input[i] !== "(" && input[i] !== "'" && input[i] !== '"' && input[i] !== "†") {
          i++;
        }
        if (startIndex < i) {
          nodes.push({
            type: "substring",
            start: startIndex,
            end: i - 1,
            substring: input.slice(startIndex, i),
          });
        }
      }
    }

    return nodes;
  }

  function findMatchingBracket(startIndex: number, closeChar: string): number {
    const openChar = input[startIndex];
    let depth = 1;

    for (let i = startIndex + 1; i < input.length; i++) {
      if (openChar !== closeChar && input[i] === openChar) {
        depth++;
      } else if (input[i] === closeChar) {
        depth--;
        if (depth === 0) {
          return i;
        }
      }
    }

    return -1; // No matching bracket found
  }

  const rootNode: TreeNode = {
    type: "root",
    start: 0,
    end: input.length - 1,
    children: parse(0, input.length - 1),
  };

  return rootNode;
}

export function replaceTree(tree: TreeNode, depth = 0): string {
  let str = "";
  let open = "";
  let close = "";
  let indent = false;
  switch (tree.type) {
    case "deadcode":
      str += tree.substring + "\n";
      return str;
    case "bracket":
      open = "[";
      close = "]";
      break;
    case "curly":
      open = "{";
      close = "}";
      break;
    case "parens":
      open = "(";
      close = ")";
      indent = tree.children?.some((x) => x.type === "parens") || false;
      break;
    case "doublequote":
      open = '"';
      close = open;
      break;
    case "singlequote":
      open = "'";
      close = open;
      break;
  }
  str += open;
  let tab = "";
  if (indent) {
    tab = " ".repeat((depth + 1) * 4);
    str += "\n" + tab;
  }
  if (tree.children) {
    tree.children.forEach((x) => (str += replaceTree(x, depth + Number(indent))));
  } else if (tree.substring) {
    str += tree.substring
      .trim()
      .replace(/\s+/, " ")
      .replace(/;\s*/g, `;\n${" ".repeat((depth + 1) * 4)}`)
      .replace(/;$/, "");
  }
  if (indent) {
    str += "\n" + " ".repeat(depth * 4);
  }
  str += close;
  return str;
}
