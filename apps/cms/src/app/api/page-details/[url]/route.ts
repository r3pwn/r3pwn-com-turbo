import configPromise from '@payload-config'
import { Page } from '@repo/payload-common/types'
import { getPayload, PaginatedDocs } from 'payload'

const payload = await getPayload({
  config: configPromise,
})

export const GET = async (_: Request, { params }: { params: Promise<{ url: string }> }) => {
  const { url } = await params
  const docs = (await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      url: {
        equals: url,
      },
    },
  })) as PaginatedDocs<Page>

  if (!docs?.docs?.length) {
    return Response.json(
      {
        error: 'Page not found',
      },
      {
        status: 404,
      },
    )
  }

  return Response.json(docs.docs[0])
}
