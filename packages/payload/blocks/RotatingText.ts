import type { Block } from "payload";

export const RotatingText: Block = {
  slug: "rotating-text",
  interfaceName: "RotatingTextBlock",
  fields: [
    {
      name: "rotatingText",
      type: "array",
      fields: [
        {
          name: "word",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
