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

import { seoPlugin } from '@payloadcms/plugin-seo'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { gcsStorage } from '@payloadcms/storage-gcs'

import { CardGroup } from './blocks/CardGroup'
import { ImageCarousel } from './blocks/ImageCarousel'
import { DisqusComments } from './blocks/DisqusComments'

import { generatePreviewUrl } from './utils/seo-helpers'
import { ImageWithText } from './blocks/ImageWithText'

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
        blocks: [CardGroup, ImageCarousel, DisqusComments, ImageWithText],
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
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
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
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug as string}`, ''),
      // add the breadcrumbs field manually on the collection, but hidden from the UI
      breadcrumbsFieldSlug: 'breadcrumbs',
    }),
    // add gcs plugin only if GCS env vars are passed
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
