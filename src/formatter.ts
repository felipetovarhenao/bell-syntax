import { SemanticNode } from "./parser";
export default function format(nodes: SemanticNode[], depth: number = 0) {
  let code: string = "";
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    const linebreak = "\n" + " ".repeat(depth * 4);
    code += linebreak;
    if (node.token.nestable && node.children) {
      code += node.token.begins;
      code += format(node.children, depth + 1);
      code += linebreak;
      code += node.token.ends;
    } else {
      code += node.substring + ` ## ${node.token.type.toLowerCase()}`;
    }
  }
  return code;
}
