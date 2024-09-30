import type { Block } from 'payload'

export const Card: Block = {
  slug: 'card',
  interfaceName: 'CardBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      hasMany: false,
      validate: () => true,
    },
    {
      name: 'link',
      type: 'relationship',
      relationTo: 'pages',
    },
  ],
}
