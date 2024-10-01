import { Field } from 'payload'

export const UrlSlugField = () => {
  return {
    name: 'url',
    type: 'text',
    index: true,
    unique: true,
    admin: {
      hidden: true,
    },
    hooks: {
      beforeChange: [
        ({ data, operation }) => {
          if (!data || !['create', 'update'].includes(operation || '')) {
            return
          }
          data.url = data.breadcrumbs?.at(-1)?.url || '/404'
        },
      ],
    },
  } as Field
}
