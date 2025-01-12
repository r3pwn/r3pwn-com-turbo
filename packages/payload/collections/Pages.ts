import { UrlSlugField } from "../fields/url-slug";
import { revalidatePages } from "../utils/revalidate-helper";
import { slugify } from "../utils/string-helpers";
import { createBreadcrumbsField } from "@payloadcms/plugin-nested-docs";
import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  lockDocuments: false,
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "subtitle"],
  },
  defaultPopulate: {
    url: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "subtitle",
      type: "text",
    },
    {
      name: "content",
      type: "richText",
      admin: {
        disableListColumn: true,
      },
    },
    createBreadcrumbsField("pages", {
      admin: {
        hidden: true,
      },
    }),
    UrlSlugField(),
    {
      name: "slug",
      type: "text",
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ data, operation }) => {
            if (!data || operation !== "create") {
              return;
            }
            data.slug = slugify(data.title);
          },
        ],
      },
    },
  ],
  hooks: {
    afterDelete: [
      async ({ doc }) => {
        await revalidatePages([doc.url]);
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, operation }) => {
        if (operation !== "update") {
          return;
        }

        const urls = [] as string[];
        if (previousDoc?.url && previousDoc.url !== doc.url) {
          urls.push(previousDoc.url);
        }
        urls.push(doc.url);

        await revalidatePages(urls);
      },
    ],
  },
};
