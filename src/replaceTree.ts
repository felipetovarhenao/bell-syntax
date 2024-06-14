import { TreeNode, NodeType } from "./bellParser";

function cleanSubstring(substring: string): string {
  return substring.trim().replace(/\s+/g, " ").replace(/;\s*/, ";\n");
}

function applyIndentation(substring: string, indent: number) {
  if (indent <= 0) {
    return substring;
  }
  return substring.replace(/\n/g, `\n${" ".repeat(indent * 4)}`);
}

function shouldIndent(tree: TreeNode, parent: TreeNode | null, index: number): boolean {
  if (tree.type !== NodeType.PARENS) {
    return false;
  }
  if (tree.children && tree.children.length > 3) {
    return true;
  }
  const depth = getTreeDepth(tree);
  if (depth > 3) {
    return true;
  }
  return false;
}

function getTreeDepth(node: TreeNode): number {
  if (!node.children || node.children.length === 0) {
    return 1;
  }

  let maxDepth = 0;
  for (const child of node.children) {
    const childDepth = getTreeDepth(child);
    if (childDepth > maxDepth) {
      maxDepth = childDepth;
    }
  }

  return maxDepth + 1;
}

function getNeighbor(parent: TreeNode | null, index: number): null | TreeNode {
  if (!parent) {
    return null;
  }
  if (parent.children && index > 0 && index < parent.children.length) {
    return parent.children[index];
  }
  return null;
}

export default function replaceTree(tree: TreeNode, parent: TreeNode | null = null, index: number = -1, indent = 0): string {
  let str = "";
  let opener = "";
  let closer = "";
  let formatter = (x: string) => x;
  const indentTest = shouldIndent(tree, parent, index);
  switch (tree.type) {
    case NodeType.COMMENT:
      // formatter = (x: string) => `\n${x}\n`;
      opener = "\n";
      closer = "\n";
      break;
    case NodeType.BRACKET:
      opener = " [";
      closer = "]";
      break;
    case NodeType.EXPRESSION:
      formatter = cleanSubstring;
      break;
    case NodeType.CURLY:
      opener = "{";
      closer = "}";
      break;
    case NodeType.PARENS:
      const leftNode = getNeighbor(parent, index - 1);
      if (leftNode && leftNode.type === NodeType.EXPRESSION && !leftNode.substring!.match(/(?<!@)\w+\s*$/)) {
        opener += " ";
      }
      if (indentTest) {
        opener += "(\n";
        closer += "\n)";
        indent++;
      } else {
        opener += "(";
        closer += ")";
      }
      break;
    case NodeType.SYMBOL:
      if (index > 0) {
        opener = " ";
      }
      if (tree.substring?.startsWith("`")) {
        closer = " ";
      }
  }
  str += applyIndentation(opener, indent);
  if (tree.substring) {
    str += applyIndentation(formatter(tree.substring), indent);
  } else if (tree.children) {
    tree.children.forEach((child, index) => (str += replaceTree(child, tree, index, indent)));
  }
  if (indentTest) {
    indent--;
  }
  str += applyIndentation(closer, indent);

  return str;
}
