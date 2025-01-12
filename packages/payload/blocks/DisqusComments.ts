import type { Block } from 'payload'

export const DisqusComments: Block = {
  slug: 'disqus-comments',
  interfaceName: 'DisqusCommentsBlock',
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'identifier',
      type: 'text',
      required: true,
    },
  ],
}
