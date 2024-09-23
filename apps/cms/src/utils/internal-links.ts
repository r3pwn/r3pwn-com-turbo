import { PageData } from '@repo/payload-common/types'

export const generatePageLink = (doc: PageData) => doc.breadcrumbs?.at(-1)
