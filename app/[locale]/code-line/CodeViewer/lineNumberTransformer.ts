import { ShikiTransformer } from "shiki";


let codeLine = 0;

export const lineNumberTransformer: ShikiTransformer = {
  line(node, line) {
    codeLine = line;
    node.children.unshift({
      type: "element",
      tagName: "span",
      properties: {
        class: "line-number",
      },
      children: [
        {
          type: "text",
          value: `${line}`,
        },
      ],
    });
  },
};

export const getCodeLine = () => codeLine