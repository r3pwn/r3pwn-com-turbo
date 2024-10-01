import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import {
  BlocksFeature,
  FixedToolbarFeature,
  InlineCodeFeature,
  lexicalEditor,
  LinkFeature,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Navigation } from './globals/Navigation'

import { fieldsSelect } from '@payload-enchants/fields-select'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { gcsStorage } from '@payloadcms/storage-gcs'

import { CardGroup } from './blocks/CardGroup'
import { ImageCarousel } from './blocks/ImageCarousel'

import { generatePreviewUrl } from './utils/seo-helpers'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Pages, Media, Users],
  globals: [Navigation],
  editor: lexicalEditor({
    features: ({ defaultFeatures, rootFeatures }) => [
      ...defaultFeatures,
      ...rootFeatures,
      BlocksFeature({
        blocks: [CardGroup, ImageCarousel],
      }),
      FixedToolbarFeature(),
      InlineCodeFeature(),
      LinkFeature(),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, '../../../packages/payload-common/types.d.ts'),
  },
  // use sqlite adapter in development, mongodb adapter in prod
  db: process.env.DATABASE_URI?.startsWith('file:')
    ? sqliteAdapter({
        idType: 'uuid',
        client: {
          url: process.env.DATABASE_URI || '',
        },
      })
    : mongooseAdapter({
        url: process.env.DATABASE_URI || '',
      }),
  sharp,
  plugins: [
    fieldsSelect({ selectIDByDefault: true }),
    seoPlugin({
      collections: ['pages'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) => doc.title,
      generateURL: ({ doc }) => generatePreviewUrl(doc),
    }),
    nestedDocsPlugin({
      collections: ['pages'],
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.id}`, ''),
      // add the breadcrumbs field manually on the collection, but hidden from the UI
      breadcrumbsFieldSlug: 'breadcrumbs',
    }),
    // add gcs plugin in prod only
    ...(process.env.GCS_BUCKET
      ? [
          gcsStorage({
            collections: {
              media: {
                generateFileURL: ({ filename }) => `${process.env.PUBLIC_MEDIA_PREFIX}/${filename}`,
              },
            },
            bucket: process.env.GCS_BUCKET,
            options: {
              credentials: JSON.parse((process.env.GCS_CREDENTIALS as string) || '{}'),
            },
          }),
        ]
      : []),
  ],
})
