import { Page } from '@repo/payload-common/types'

export const generatePreviewUrl = (doc: Page) =>
  `https://www.example.com${doc.breadcrumbs?.at(-1)?.url || ''}`
