import { SemanticNode } from "./parser";
export default function format(nodes: SemanticNode[]) {
  let code: string = "";
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    code += "\n";
    if (node.token.nestable && node.children) {
      code += node.token.begins;
      code += format(node.children);
      code += "\n";
      code += node.token.ends;
    } else {
      code += node.substring + ` ## ${node.token.type.toLowerCase()}`;
    }
  }
  return code;
}
