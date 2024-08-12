export enum NodeType {
  SYMBOL = "SYMBOL",
  BRACKET = "BRACKET",
  PARENS = "PARENS",
  CURLY = "CURLY",
  EXPRESSION = "EXPRESSION",
  ROOT = "ROOT",
  COMMENT = "COMMENT",
  ATTR = "ATTR",
  PITCH = "PITCH",
}

export interface TreeNode {
  type: NodeType;
  start: number;
  end: number;
  children?: TreeNode[];
  substring?: string;
}

export enum TokenType {
  PARENS = "PARENS",
  BRACKET = "BRACKET",
  CURLY = "CURLY",
  SYMBOL = "SYMBOL",
  ROOT = "ROOT",
  COMMENT = "COMMENT",
  MULTI_COMMENT = "MULTI_COMMENT",
  VARIABLE = "VARIABLE",
  FUNCTION = "FUNCTION",
  UNKNOWN = "UNKNOWN",
  INTEGER = "INTEGER",
  FLOAT = "FLOAT",
  BINARY_OPERATOR = "BINARY_OPERATOR",
  UNARY_OPERATOR = "UNARY_OPERATOR",
  ASSIGNMENT_OPERATOR = "ASSIGNMENT_OPERATOR",
  KEYWORD = "KEYWORD",
  FUNCTIONAL_OPERATOR = "FUNCTIONAL_OPERATOR",
  SPECIAL_OPERATOR = "SPECIAL_OPERATOR",
  COMPARISON_OPERATOR = "COMPARISON_OPERATOR",
  DIRECTIVE = "DIRECTIVE",
  NULLIFIER = "NULLIFIER",
  ARGUMENT = "ARGUMENT",
  PITCH = "PITCH",
  CONSTANT = "CONSTANT",
}
export interface Token {
  type: TokenType;
  regexOpen: RegExp;
  regexClose?: RegExp;
  nestable: boolean;
  begins?: string;
  ends?: string;
}
export interface SemanticNode {
  token: Token;
  start: number;
  end: number;
  children?: SemanticNode[];
  substring?: string;
}
const TOKENS: Token[] = [
  {
    type: TokenType.COMMENT,
    regexOpen: new RegExp(/(#[#!](?!=))/),
    regexClose: new RegExp(/.(?=\n|\r|$)/),
    nestable: false,
  },
  {
    type: TokenType.MULTI_COMMENT,
    regexOpen: new RegExp(/(#\()/),
    regexClose: new RegExp(/\)#/),
    nestable: false,
  },
  {
    type: TokenType.SYMBOL,
    regexOpen: new RegExp(/(`\S+\s)/),
    nestable: false,
  },
  {
    type: TokenType.SYMBOL,
    regexOpen: new RegExp(/("[^"]*")/),
    nestable: false,
  },
  {
    type: TokenType.SYMBOL,
    regexOpen: new RegExp(/('[^']*')/),
    nestable: false,
  },
  {
    type: TokenType.DIRECTIVE,
    regexOpen: new RegExp(/((?<=\b|^)(?<!\$|#)include(?=\())/),
    regexClose: new RegExp(/\)/),
    nestable: false,
  },
  {
    type: TokenType.PARENS,
    regexOpen: new RegExp(/(\()/),
    regexClose: new RegExp(/\)/),
    begins: "(",
    ends: ")",
    nestable: true,
  },
  {
    type: TokenType.BRACKET,
    regexOpen: new RegExp(/(\[)/),
    regexClose: new RegExp(/\]/),
    begins: "[",
    ends: "]",
    nestable: true,
  },
  {
    type: TokenType.CURLY,
    regexOpen: new RegExp(/(\{)/),
    regexClose: new RegExp(/\}/),
    nestable: false,
  },
  {
    type: TokenType.KEYWORD,
    regexOpen: new RegExp(/((?<=\b)(?<!\$|#)for|init|do|collect|if|while|then|else|in|keep|unkeep|with|as(?=\b))/),
    nestable: false,
  },
  {
    type: TokenType.FUNCTION,
    regexOpen: new RegExp(/(\$?[A-Za-z]\w*)(?=\()/),
    nestable: false,
  },
  {
    type: TokenType.PITCH,
    regexOpen: new RegExp(/((?<!\$|#)(?<=\b)[A-Ga-g][#bxdq\^v]*[0-9]+(?:[+-]\d+\/\d+t)?(?=\b))/),
    nestable: false,
  },
  {
    type: TokenType.CONSTANT,
    regexOpen: new RegExp(/(?<=\b)(?<!\$|#)(null|nil|pi)(?=\b)/),
    nestable: false,
  },
  {
    type: TokenType.CONSTANT,
    regexOpen: new RegExp(/((?<!\w)\$(?:args|argcount)(?=\b|$))/),
    nestable: false,
  },
  {
    type: TokenType.SPECIAL_OPERATOR,
    regexOpen: new RegExp(/(<\.{3}>|\.{3}|-[\^>])/),
    nestable: false,
  },
  {
    type: TokenType.CONSTANT,
    regexOpen: new RegExp(/((?<!\w)\$(?:[lipfr]|d?[xo])\d+(?=\b|$))/),
    nestable: false,
  },
  {
    type: TokenType.ARGUMENT,
    regexOpen: new RegExp(/(?<!(?:@|\w)+)(@[A-Za-z]\w*(?=\s))/),
    nestable: false,
  },
  {
    type: TokenType.FLOAT,
    regexOpen: new RegExp(/([+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)(?!\.)/),
    nestable: false,
  },
  {
    type: TokenType.INTEGER,
    regexOpen: new RegExp(/((?:(?<=\s)[+-])?\d+)/),
    nestable: false,
  },
  {
    type: TokenType.COMPARISON_OPERATOR,
    regexOpen: new RegExp(/((?:!|=|<|>)=)/),
    nestable: false,
  },
  {
    type: TokenType.ASSIGNMENT_OPERATOR,
    regexOpen: new RegExp(/((?:\.|!?_|:|\+|-|\*{1,2}|\/{1,2}|%|\^{1,2}|>{1,2}|<{1,2}|&{1,3}|\|{1,3})?=)/),
    nestable: false,
  },
  {
    type: TokenType.UNARY_OPERATOR,
    regexOpen: new RegExp(/((?<!#)!|~|u?-|\+(?=[\[\(]|(?:[$|#]?[A-Za-z0-9])))/),
    nestable: false,
  },
  {
    type: TokenType.BINARY_OPERATOR,
    // basic version of regex
    regexOpen: new RegExp(/(\+|-|\*{1,2}|:{1,2}|\.|\/{1,2}|%|\^{1,2}|>{1,2}|<{1,2}|&{1,3}|\|{1,3})/),
    nestable: false,
  },
  {
    type: TokenType.FUNCTIONAL_OPERATOR,
    regexOpen: new RegExp(/(#(?:\+|-|u-|\*|\/{1,2}|%|==|!=|<=|>=|<{1,2}|>{1,2}|&{1,3}|\^{1,2}|\|{1,3}))/),
    nestable: false,
  },
  {
    type: TokenType.NULLIFIER,
    regexOpen: new RegExp(/(;)/),
    nestable: false,
  },
  {
    type: TokenType.VARIABLE,
    regexOpen: new RegExp(/((?:\$|#)?[A-Za-z]\w*)/),
    nestable: false,
  },

  //   {
  //     type: TokenType.UNKNOWN,
  //     regexOpen: new RegExp(/./),
  //     regexClose: new RegExp(/.$/),
  //     readonly: true,
  //   },
];

export default function parseSubstrings(input: string): SemanticNode[] {
  // array with all opening patterns, useful for using findIndex on, to later match corresponding token
  const openers = TOKENS.map((x) => String(x.regexOpen.source));

  // regex pattern with all openers in one. Careful attention must be given to order of tokens to ensure proper precedence
  const tokenOpen = new RegExp(openers.join("|"));

  // main recursive parsing callback
  function parse(start: number, end: number, parent?: SemanticNode): SemanticNode[] {
    // we initialize nodes
    const nodes: SemanticNode[] = [];
    // copy start index of input subtring
    let i = start;

    // we use a temporary count variable to prevent infinite loops, just in case. Should be removed at some point
    let count = 0;

    // we scan through the input string until we're done
    while (i <= end || count > 100000) {
      // the subtring to find patterns in
      const slice = input.slice(i, end + 1);

      // we look for any openers
      const match = tokenOpen.exec(slice);

      // we also check for closures, if there's a parent token
      const closingMatch = parent?.token.regexClose!.exec(slice);

      // if neither, just stop looking
      if (!match && !closingMatch) {
        // no recognizable patterns left
        break;
      }

      // if there's a pending token to close and there's either no match or match starts after the closer, mutate parent's end and stop loop
      if (closingMatch && (!match || closingMatch.index <= match.index)) {
        // mutate end value in parent node
        parent!.end = i + closingMatch.index + closingMatch[0].length;
        break;
      }

      // ensure we don't have any matches
      if (!match) {
        break;
      }

      // get length of match
      const matchLength = match[0].length;

      // after the first item in match, the first non undefined value is the capture group index corresponding to the token
      const tokenIndex = match.splice(1).findIndex((element) => element !== undefined);

      // get token from master token list
      const token = TOKENS[tokenIndex];

      // start index for token
      const startIndex = match.index;

      // we get the slice after the pattern opener (not just the first character)
      let remains = slice.slice(startIndex + matchLength);

      // we initialize the end index with the matched pattern's length
      let endIndex = matchLength;

      // handle nestable tokens
      if (token.nestable) {
        // look for children tokens
        const node: SemanticNode = {
          token: token,
          start: i + startIndex,
          end: i + startIndex + endIndex,
        };
        const children = parse(i + startIndex + matchLength, end, node);

        // assign children
        node.children = children;

        // offset cursor to match end of nested node
        i = node.end;

        // push nested node
        nodes.push(node);
      } else {
        if (token.regexClose) {
          // find the regex closer
          const endMatch = token.regexClose.exec(remains);
          if (!endMatch) {
            // if there's no closure, stop looking
            break;
          }
          // increment token end index
          endIndex += endMatch.index + endMatch[0].length;
        }
        // get token substring
        const substr = slice.slice(startIndex, startIndex + endIndex);

        // push to semantic tree
        nodes.push({
          token: token,
          substring: substr,
          start: startIndex + i,
          end: startIndex + endIndex + i,
        });
        // offset starting point
        i += startIndex + endIndex;
      }

      count++;
    }

    return nodes;
  }

  return parse(0, input.length - 1);
}
