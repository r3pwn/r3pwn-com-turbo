import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import type { Block } from "payload";
import { RotatingText } from "./RotatingText";

export const ImageWithText: Block = {
  slug: "image-with-text",
  interfaceName: "ImageWithTextBlock",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          hasMany: false,
          validate: () => true,
        },
        {
          name: "text",
          type: "richText",
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              BlocksFeature({
                inlineBlocks: [RotatingText],
              }),
            ],
          }),
        },
      ],
    },
  ],
};
