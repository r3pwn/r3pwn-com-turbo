import type { Block } from 'payload'

export const CardGroup: Block = {
  slug: 'card-group',
  interfaceName: 'CardGroupBlock',
  fields: [
    {
      name: 'cards',
      type: 'array',
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
    },
  ],
}
