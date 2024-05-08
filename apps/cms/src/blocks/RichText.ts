import { Block } from 'payload/types'

const RichText: Block = {
  slug: 'rich-text',
  interfaceName: 'RichTextBlock',
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}

export default RichText
