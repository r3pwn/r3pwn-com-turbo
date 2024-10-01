import type { Block } from 'payload'

export const ImageCarousel: Block = {
  slug: 'image-carousel',
  interfaceName: 'ImageCarouselBlock',
  fields: [
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          hasMany: false,
          validate: () => true,
        },
      ],
    },
  ],
}
