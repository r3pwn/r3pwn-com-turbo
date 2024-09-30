import { SlugAsIdField } from '@/fields/slug-as-id'
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
    SlugAsIdField((doc) => doc.title),
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
  ],
}
