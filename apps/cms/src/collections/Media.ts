import { CollectionConfig } from 'payload/types'

export const Media: CollectionConfig = {
  slug: 'media',
  typescript: {
    interface: 'PayloadMedia',
  },
  fields: [
    {
      name: 'altText',
      type: 'text',
      required: false,
    },
  ],
  upload: {
    disableLocalStorage: true,
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
  },
}
