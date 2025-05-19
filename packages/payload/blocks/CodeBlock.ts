import type { Block } from "payload";

export const CodeBlock: Block = {
  slug: "code-block",
  interfaceName: "CodeBlock",
  fields: [
    {
      name: "language",
      type: "select",
      required: true,
      defaultValue: "plain",
      options: [
        {
          label: "Plaintext",
          value: "plain",
        },
        {
          label: "JavaScript",
          value: "js",
        },
        {
          label: "TypeScript",
          value: "ts",
        },
        {
          label: "C#",
          value: "csharp",
        },
        {
          label: "Python",
          value: "python",
        },
        {
          label: "Java",
          value: "java",
        },
        {
          label: "Go",
          value: "go",
        },
        {
          label: "HTML",
          value: "html",
        },
        {
          label: "CSS",
          value: "css",
        },
        {
          label: "YAML",
          value: "yaml",
        },
        {
          label: "JSON",
          value: "json",
        },
        {
          label: "JSON5",
          value: "json5",
        },
        {
          label: "XML",
          value: "xml",
        },
      ],
    },
    {
      name: "code",
      type: "code",
      required: true,
    },
  ],
};
