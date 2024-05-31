import { Block } from 'payload/types'

const Cards: Block = {
  slug: 'cards',
  interfaceName: 'CardsBlock',
  fields: [
    {
      name: 'cards',
      type: 'array',
      required: true,
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
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export default Cards
