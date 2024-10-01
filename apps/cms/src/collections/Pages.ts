import { UrlSlugField } from '@/fields/url-slug'
import { slugify } from '@/utils/string-helpers'
import { createBreadcrumbsField } from '@payloadcms/plugin-nested-docs'
import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  lockDocuments: false,
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'subtitle'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        disableListColumn: true,
      },
    },
    createBreadcrumbsField('pages', {
      admin: {
        hidden: true,
      },
    }),
    UrlSlugField(),
    {
      name: 'slug',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ data, operation }) => {
            if (!data || operation !== 'create') {
              return
            }
            data.slug = slugify(data.title)
          },
        ],
      },
    },
  ],
}
