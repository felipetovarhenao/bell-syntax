export enum NodeType {
  SYMBOL = "SYMBOL",
  BRACKET = "BRACKET",
  PARENS = "PARENS",
  CURLY = "CURLY",
  EXPRESSION = "EXPRESSION",
  ROOT = "ROOT",
  COMMENT = "COMMENT",
}

export interface TreeNode {
  type: NodeType;
  start: number;
  end: number;
  children?: TreeNode[];
  substring?: string;
}

export default function parseSubstrings(input: string): TreeNode {
  function parse(start: number, end: number): TreeNode[] {
    // intialize tree
    const nodes: TreeNode[] = [];

    let i = start;

    // regex for node openers
    const openingPattern = /\{|\[|\(|"|'|#|`/;

    while (i <= end) {
      // unscanned substring
      const slice = input.slice(i, end + 1);

      // check for openers
      const match = openingPattern.exec(slice);

      if (!match) {
        // push leftover as substring
        nodes.push({
          type: NodeType.EXPRESSION,
          start: i,
          end: end,
          substring: slice,
        });
        break;
      } else {
        // if opener is not at the beginning, push substring into tree
        if (match.index > 0) {
          nodes.push({
            type: NodeType.EXPRESSION,
            start: i,
            end: i + match.index,
            substring: slice.slice(0, match.index),
          });
        }
        // offset cursor to match opener
        i += match.index;
        let type: NodeType = NodeType.EXPRESSION;
        let closeChar: string = "";
        let closeRegex: RegExp = /./;
        let isDead: boolean = false;
        const openIndex = i;
        switch (match[0]) {
          case "#":
            if (input[i + 1] === "(" || input[i + 1] === "#") {
              isDead = true;
              closeChar = "";
              type = NodeType.COMMENT;
              i++;
              switch (input[i]) {
                case "(":
                  closeRegex = /\)#/m;
                  break;
                case "#":
                  closeRegex = /.$/m;
                  break;
              }
            }
            break;
          case "{":
            type = NodeType.CURLY;
            closeChar = "}";
            break;
          case "[":
            type = NodeType.BRACKET;
            closeChar = "]";
            break;
          case "(":
            type = NodeType.PARENS;
            closeChar = ")";
            break;
          case '"':
            type = NodeType.SYMBOL;
            isDead = true;
            closeRegex = /(?<!\\)"/;
            break;
          case "'":
            type = NodeType.SYMBOL;
            isDead = true;
            closeRegex = /(?<!\\)'/;
            break;
          case "`":
            type = NodeType.SYMBOL;
            isDead = true;
            closeRegex = /.(?=(\s|$))/m;
            break;
        }
        let closeIndex = isDead ? findEnd(i + 1, closeRegex) : findMatchingBracket(i, closeChar);

        if (closeIndex !== -1) {
          let children = undefined;
          let substring = undefined;
          if (!isDead) {
            children = parse(openIndex + 1, closeIndex - 1);
          } else {
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
    type: NodeType.ROOT,
    start: 0,
    end: input.length - 1,
    children: parse(0, input.length - 1),
  };

  return rootNode;
}
