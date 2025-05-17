import { Field } from "payload";

export const LinkFields = () => {
  return [
    {
      name: "label",
      type: "text",
    },
    {
      name: "linkType",
      type: "radio",
      options: [
        {
          label: "Internal",
          value: "internal",
        },
        {
          label: "External",
          value: "external",
        },
      ],
      defaultValue: "internal",
    },
    {
      name: "target",
      type: "relationship",
      relationTo: "pages",
      admin: {
        condition: (data, siblingData) => {
          return siblingData?.linkType === "internal";
        },
      },
    },
    {
      name: "url",
      type: "text",
      admin: {
        condition: (data, siblingData) => {
          return siblingData?.linkType === "external";
        },
      },
    },
    {
      name: "openInNewTab",
      type: "checkbox",
      label: "Open link in new tab",
      defaultValue: false,
    },
  ] as Field[];
};
