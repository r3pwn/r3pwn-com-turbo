import { revalidateTags } from "../utils/revalidate-helper";
import { IconField } from "../fields/icon-field";
import { LinkFields } from "../fields/link-fields";
import type { Field, GlobalConfig } from "payload";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  typescript: {
    interface: "NavigationData",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "header",
          interfaceName: "Header",
          fields: [
            {
              name: "navigationLinks",
              type: "array",
              label: "Navigation Links",
              labels: {
                singular: "Link",
                plural: "Links",
              },
              fields: [...LinkFields(), IconField()],
            },
          ],
        },
        {
          name: "footer",
          interfaceName: "Footer",
          fields: [
            {
              name: "socialLinks",
              type: "array",
              label: "Social Links",
              labels: {
                singular: "Link",
                plural: "Links",
              },
              fields: [
                {
                  name: "ariaLabel",
                  type: "text",
                },
                IconField(),
                ...LinkFields().filter(
                  (field: Field & { name?: string }) => field.name !== "label"
                ),
              ],
            },
            {
              name: "copyrightText",
              type: "text",
            },
          ],
        },
        {
          name: "redirects",
          interfaceName: "Redirects",
          fields: [
            {
              name: "redirects",
              type: "array",
              label: "Redirects",
              fields: [
                {
                  name: "path",
                  type: "text",
                  required: true,
                },
                {
                  name: "destination",
                  type: "relationship",
                  relationTo: "pages",
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        await revalidateTags(["navigation"]);
      },
    ],
  },
};
