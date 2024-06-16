import { TreeNode, NodeType } from "./bellParser";

function cleanSubstring(substring: string, isLast: boolean = false): string {
  let clean = substring.trim().replace(/\s+/g, " ").replace(/;+\s*/g, ";\n");
  if (isLast) {
    return clean.replace(/;+\s*$/, "");
  }
  return clean;
}

function applyIndentation(substring: string, indent: number) {
  if (indent <= 0) {
    return substring;
  }
  return substring.replace(/\n/g, `\n${" ".repeat(indent * 4)}`);
}

function isLastExpression(tree: TreeNode, parent: TreeNode | null, index: number): boolean {
  if (tree.type !== NodeType.EXPRESSION || !parent) {
    return false;
  }
  if (!parent.children) {
    return false;
  }
  for (let i = index + 1; i < parent.children.length; i++) {
    if (parent.children[i].type === NodeType.EXPRESSION) {
      return false;
    }
  }
  return true;
}

function shouldIndent(tree: TreeNode, parent: TreeNode | null, index: number): boolean {
  if (tree.type === NodeType.ATTR && parent?.type === NodeType.PARENS) {
    let attrCount = 0;
    parent.children?.forEach((x, i) => {
      if (attrCount === 0 && index === i) {
        return false;
      } else if (x.type === NodeType.ATTR) {
        attrCount++;
      }
    });
    if (attrCount > 2) {
      return true;
    }
    return false;
  }
  if (tree.type !== NodeType.PARENS && tree.type !== NodeType.BRACKET) {
    return false;
  }
  if (tree.children && tree.children.length > 4) {
    return true;
  }
  const depth = getTreeDepth(tree);
  if (depth > 3) {
    return true;
  }
  if (tree.children) {
    for (let i = 0; i < tree.children.length; i++) {
      if (tree.children[i].type === NodeType.EXPRESSION && tree.children[i].substring!.match(/;/)) {
        return true;
      }
    }
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

export default function replaceTree(tree: TreeNode, parent: TreeNode | null = null, index: number = -1, indent = 0, replaced: string = ""): string {
  if (tree.type === NodeType.PARENS && tree.children!.length === 1 && tree.children![0].type === tree.type) {
    return replaceTree(tree.children![0], parent, index, indent, replaced);
  }
  let str = "";
  let opener = "";
  let closer = "";
  let level = indent;
  let ending = null;
  const concatenables = /(\(|\[|\{|:|\.|;)\s*$/;
  const closers = /(\}|\]|\))\s*$/;
  let formatter = (x: string) => x;
  const indentTest = shouldIndent(tree, parent, index);
  switch (tree.type) {
    case NodeType.COMMENT:
      const last = getNeighbor(parent, index - 1);
      if (!replaced.match(/(\n|\r|\r\n)\s*$/) || (last?.type === NodeType.EXPRESSION && last.substring !== "\n")) {
        opener = "\n";
      }
      closer = "\n";
      break;
    case NodeType.BRACKET:
      opener = "";
      ending = replaced.match(/\S$/);
      if (ending && !ending[0].match(concatenables)) {
        opener = " ";
      }
      if (indentTest) {
        opener += "[\n";
        closer += "\n]";
        level++;
      } else {
        opener += "[";
        closer += "]";
      }
      break;
    case NodeType.EXPRESSION:
      if (tree.substring?.trim() === "") {
        return "";
      }
      ending = replaced.match(/\S$/);
      if (ending && !ending[0].match(concatenables) && !tree.substring!.match(/^\s*(;|\.|:|,)/)) {
        opener = " ";
      }
      if (tree.substring?.match(/\s$/) && getNeighbor(parent, index + 1)?.type === NodeType.PARENS) {
        closer = " ";
      }
      formatter = (x: string) => cleanSubstring(x, isLastExpression(tree, parent, index));
      break;
    case NodeType.CURLY:
      ending = replaced.match(/\S$/);
      if (ending && !ending[0].match(concatenables)) {
        opener = " ";
      }
      break;
    case NodeType.PARENS:
      opener = " ";
      if (replaced.match(/\s$/) || replaced.match(concatenables) || replaced.match(closers)) {
        opener = "";
      } else {
        ending = replaced.match(/\b(?<!@)\w+\s*$/);
        if (ending && !ending[0].match(/\b(for|in|do|collect|if|while|then|else|init|keep|unkeep|with|as)\b/)) {
          opener = "";
        }
      }
      if (indentTest) {
        opener += "(\n";
        closer += "\n)";
        level++;
      } else {
        opener += "(";
        closer += ")";
      }
      break;
    case NodeType.SYMBOL:
      ending = replaced.match(/\S$/);
      if (ending && !ending[0].match(concatenables)) {
        opener = " ";
      }
      if (tree.substring?.startsWith("`")) {
        closer = " ";
      }
      break;
    case NodeType.ATTR:
      ending = replaced.match(/\S$/);
      if (indentTest && ending) {
        opener = "\n";
      } else {
        if (ending && !ending[0].match(/(\()$/)) {
          opener = " ";
        }
      }
      closer = " ";
      break;
  }
  str += applyIndentation(opener, level);
  if (tree.substring) {
    str += applyIndentation(formatter(tree.substring), level);
  } else if (tree.children) {
    tree.children.forEach((child, index) => (str += replaceTree(child, tree, index, level, str)));
  }
  if (indentTest) {
    level--;
  }
  str += applyIndentation(closer, level);

  return str;
}
