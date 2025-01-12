import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const ImageWithText: Block = {
  slug: 'image-with-text',
  interfaceName: 'ImageWithTextBlock',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          hasMany: false,
          validate: () => true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'text',
          type: 'richText',
          editor: lexicalEditor(),
          admin: {
            width: '50%',
          },
        },
      ],
    },
  ],
}
