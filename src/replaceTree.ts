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

export default function replaceTree(tree: TreeNode, parent: TreeNode | null = null, index: number = -1, indent = 0): string {
  let str = "";
  let opener = "";
  let closer = "";
  let formatter = (x: string) => x;
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
      opener = "(\n";
      closer = "\n)";
      indent++;
      break;
    case NodeType.SYMBOL:
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
  if (tree.type === NodeType.PARENS) {
    indent--;
  }
  str += applyIndentation(closer, indent);

  return str;
}
