export default function findUnclosedParens(input: string, position: number): string | null {
  const regex = /\.?\$?[A-Za-z]([A-Za-z0-9_]*)?[A-Za-z0-9]*$/;

  let balance = 0;
  let openParenIndex: number | null = null;

  // Move backward from the given position to find the most recent unclosed '('
  for (let i = position - 1; i >= 0; i--) {
    if (input[i] === ")") {
      balance++;
    } else if (input[i] === "(") {
      balance--;
      if (balance < 0) {
        // Found the most recent unclosed '('
        openParenIndex = i;
        break;
      }
    }
  }
  // If no unclosed '(' is found, return null
  if (openParenIndex === null) {
    return null;
  }

  const match = input.slice(0, openParenIndex).match(regex)!;
  if (match) {
    return match[0];
  }
  return null;
}
