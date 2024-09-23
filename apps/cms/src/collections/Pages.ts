import { CollectionConfig } from 'payload'
import { bustCache } from '../utils/cache-buster'
import { PageData } from '@repo/payload-common/types'
import { createBreadcrumbsField } from '@payloadcms/plugin-nested-docs'
import { Breadcrumb } from '@payloadcms/plugin-nested-docs/types'
import RichText from '@/blocks/RichText'
import Cards from '@/blocks/Cards'

export const Pages: CollectionConfig = {
  slug: 'pages',
  typescript: {
    interface: 'PageData',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'description'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Header',
          fields: [
            {
              name: 'showHeader',
              type: 'checkbox',
            },
            {
              type: 'collapsible',
              label: 'Header',
              fields: [
                {
                  name: 'showBreadcrumbs',
                  type: 'checkbox',
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'subtitle',
                  type: 'text',
                },
                {
                  name: 'description',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'featuredImage',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'blocks',
              blocks: [RichText, Cards],
            },
          ],
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'postedDate',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: {
          displayFormat: 'yyyy-MM-dd',
          pickerAppearance: 'dayOnly',
        },
      },
    },
    createBreadcrumbsField('pages', {
      admin: {
        hidden: true,
      },
    }),
  ],
  endpoints: [
    {
      path: '/list',
      method: 'get',
      handler: async (req) => {
        const { payload } = req

        const data = await payload.find({
          collection: 'pages',
          depth: 0,
          limit: 1000,
        })

        if (data.docs) {
          return Response.json(
            data.docs.map((doc) => ({
              title: doc.title,
              url: (doc.breadcrumbs as Breadcrumb[])?.at(-1)?.url,
              postedDate: doc.postedDate,
            })),
            { status: 200 },
          )
        } else {
          return Response.json({ message: 'Not found' }, { status: 404 })
        }
      },
    },
    {
      path: '/by-slug/:slug',
      method: 'get',
      handler: async (req) => {
        const { payload } = req

        if (!req.routeParams?.slug) {
          return Response.json({ message: 'No slug provided' }, { status: 400 })
        }

        const slugs = (req.routeParams.slug as string).split(',')

        const data = await payload.find({
          collection: 'pages',
          where: {
            slug: { equals: slugs.at(-1) },
          },
          depth: 1,
        })
        const matchingDoc = data.docs.find((doc) =>
          (doc as unknown as PageData).breadcrumbs?.some(
            (breadcrumb) => breadcrumb.url === `/${slugs.join('/')}`,
          ),
        )

        if (matchingDoc) {
          return Response.json(matchingDoc, { status: 200 })
        } else {
          return Response.json(null, { status: 404 })
        }
      },
    },
  ],
  hooks: {
    afterChange: [
      async (args: { doc: PageData; previousDoc?: PageData }) => {
        const currentPaths = args.doc.breadcrumbs?.map((crumb) => crumb.url as string) ?? []
        const prevPaths = args.previousDoc?.breadcrumbs?.map((crumb) => crumb.url as string) ?? []

        const paths = new Set([...currentPaths, ...prevPaths])

        if (paths.has('/index')) {
          paths.delete('/index')
          paths.add('/')
        }

        await bustCache(Array.from(paths))
      },
    ],
    afterDelete: [
      async (args: { doc: PageData }) => {
        const paths = new Set(args.doc.breadcrumbs?.map((crumb) => crumb.url as string))

        if (paths.has('/index')) {
          paths.delete('/index')
          paths.add('/')
        }

        await bustCache(Array.from(paths))
      },
    ],
  },
}
