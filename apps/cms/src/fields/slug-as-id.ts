import { slugify } from '@/utils/string-helpers'
import { Field } from 'payload'

export const SlugAsIdField = (slugToUse: (doc: any) => string) => {
  return {
    name: 'id',
    type: 'text',
    admin: {
      hidden: true,
    },
    hooks: {
      beforeChange: [
        ({ data, operation }) => {
          // ID can only be set on create
          if (!data || operation !== 'create') {
            return
          }
          data.id = slugify(slugToUse(data))
        },
      ],
    },
  } as Field
}
