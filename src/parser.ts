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

enum TokenType {
  PARENS,
  BRACKET,
  CURLY,
  SYMBOL,
  ROOT,
  COMMENT,
  MULTI_COMMENT,
  VARIABLE,
  UNKNOWN,
}
interface Token {
  type: TokenType;
  regexOpen: RegExp;
  regexClose?: RegExp;
  readonly: boolean;
}
interface SemanticNode {
  token: Token;
  children?: SemanticNode[];
  substring?: string;
}
const TOKENS: Token[] = [
  {
    type: TokenType.COMMENT,
    regexOpen: new RegExp(/(##|#!)/),
    regexClose: new RegExp(/\n|\r/),
    readonly: true,
  },
  {
    type: TokenType.MULTI_COMMENT,
    regexOpen: new RegExp(/(#\()/),
    regexClose: new RegExp(/\)#/),
    readonly: true,
  },
  {
    type: TokenType.VARIABLE,
    regexOpen: new RegExp(/(\$?[A-Za-z]\w*)/),
    readonly: true,
  },
  //   {
  //     type: TokenType.UNKNOWN,
  //     regexOpen: new RegExp(/./),
  //     regexClose: new RegExp(/.$/),
  //     readonly: true,
  //   },
];

export default function parseSubstrings(input: string): SemanticNode[] {
  const openers = TOKENS.map((x) => String(x.regexOpen.source));
  const tokenOpen = new RegExp(openers.join("|"));
  function parse(start: number, end: number): SemanticNode[] {
    const nodes: SemanticNode[] = [];
    const substrings: string[] = [];

    let i = start;
    let count = 0;
    while (i <= end || count > 100) {
      const slice = input.slice(i, end + 1);
      const match = tokenOpen.exec(slice);
      if (!match) {
        break;
      }
      const matchLength = match[0].length;
      const tokenIndex = match.splice(1).findIndex((element) => element !== undefined);
      const token = TOKENS[tokenIndex];
      const startIndex = match.index;
      const remains = slice.slice(startIndex + matchLength);
      let endIndex = matchLength;
      if (token.regexClose) {
        const endMatch = token.regexClose.exec(remains);
        if (!endMatch) {
          break;
        }
        endIndex += endMatch.index + endMatch[0].length;
      }
      const substr = slice.slice(startIndex, startIndex + endIndex);
      console.log("\n-----");
      console.log(substr);
      substrings.push(substr);
      i += startIndex + endIndex;
      count++;
    }

    return nodes;
  }

  return parse(0, input.length - 1);
}
