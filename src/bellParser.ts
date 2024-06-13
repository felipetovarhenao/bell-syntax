import * as vscode from "vscode";

type NodeType = "singlequote" | "doublequote" | "bracket" | "parens" | "curly" | "substring" | "root" | "deadcode" | "block" | "comment";

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

    const openingPattern = /\{|\[|\(|"|'|#/;

    while (i <= end) {
      const slice = input.slice(i);
      const match = openingPattern.exec(slice);
      if (match && match[0]) {
        if (match.index > 0) {
          nodes.push({
            type: "substring",
            start: i,
            end: i + match.index,
            substring: slice.slice(0, match.index),
          });
        }
        i += match.index;
        let type: NodeType = "substring";
        let deadType: NodeType = "substring";
        let closeChar: string = "";
        let closeRegex: RegExp = /./;
        const openIndex = i;
        switch (match[0]) {
          case "#":
            if (input[i + 1] === "(" || input[i + 1] === "#") {
              type = "deadcode";
              closeChar = "";
              i++;
              switch (input[i]) {
                case "(":
                  deadType = "block";
                  closeRegex = /\)#/m;
                  break;
                case "#":
                  closeRegex = /.$/m;
                  deadType = "comment";
                  break;
              }
            }
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
            type = "deadcode";
            deadType = "doublequote";
            closeChar = '"';
            closeRegex = /(?<!\\)"/;
            break;
          case "'":
            type = "deadcode";
            deadType = "singlequote";
            closeChar = "'";
            closeRegex = /(?<!\\)'/;
            break;
        }
        let closeIndex = type === "deadcode" ? findEnd(i + 1, closeRegex) : findMatchingBracket(i, closeChar);

        if (closeIndex !== -1) {
          let children = undefined;
          let substring = undefined;
          if (type !== "deadcode") {
            children = parse(openIndex + 1, closeIndex - 1);
          } else {
            type = deadType;
            substring = input.slice(openIndex, closeIndex);
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
        const startIndex = i;
        i = end + 1;
        nodes.push({
          type: "substring",
          start: startIndex,
          end: end,
          substring: input.slice(startIndex),
        });
      }
    }

    return nodes;
  }

  function findEnd(startIndex: number, regex: RegExp) {
    const match = input.slice(startIndex).match(regex);
    if (!match?.index) {
      return input.length - 1;
    }
    return match.index + startIndex + match[0].length;
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
      if (tree.substring?.startsWith("#")) {
        str += "\n";
      }
      str += tree.substring;
      if (tree.substring?.startsWith("#")) {
        str += "\n";
      }
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
