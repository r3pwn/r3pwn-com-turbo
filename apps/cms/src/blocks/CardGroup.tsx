import type { Block } from 'payload'

export const Card: Block = {
  slug: 'card-group',
  interfaceName: 'CardBlock',
  fields: [
    {
      name: 'displayStyle',
      type: 'select',
      options: [
        {
          label: 'Flex',
          value: 'flex',
        },
        {
          label: 'Carousel (scrollable)',
          value: 'scrollView',
        },
      ],
    },
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
