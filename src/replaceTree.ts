import { TreeNode, NodeType } from "./bellParser";

function cleanSubstring(substring: string): string {
  return substring
    .trim()
    .replace(/(\s|\\n|\\r)+/g, " ")
    .replace(/;\s*/, ";\n");
}

export default function replaceTree(tree: TreeNode, parent: TreeNode | null = null, index: number = -1, indent = 0): string {
  let str = "";
  let opener = "";
  let closer = "";
  let formatter = (x: string) => x;
  switch (tree.type) {
    case NodeType.COMMENT:
      closer = "\n";
      break;
    case NodeType.BRACKET:
      opener = "[";
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
      opener = "(";
      closer = ")";
      break;
    case NodeType.SYMBOL:
      if (tree.substring?.startsWith("`")) {
        closer = " ";
      }
  }
  str += opener;
  if (tree.substring) {
    str += formatter(tree.substring);
  } else if (tree.children) {
    tree.children.forEach((child, index) => (str += replaceTree(child, tree, index)));
  }
  str += closer;

  return str;
}
