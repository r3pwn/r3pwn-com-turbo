import configPromise from '@payload-config'
import { LinkFields } from '@payloadcms/richtext-lexical'
import { Page } from '@repo/payload-common/types'
import { getPayload } from 'payload'

type ContentNode = {
  type: string
  version: number
  children: ContentNode[]
  fields?: LinkFields
  [k: string]: unknown
}

export const GET = async (_: Request, { params }: { params: { id: string } }) => {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = (await payload.findByID({
    collection: 'pages',
    id: params.id,
    depth: 0,
  })) as Page

  const walkContentNodes = async (node: ContentNode) => {
    if (node.children?.length) {
      for (let childNode of node.children) {
        await walkContentNodes(childNode)
      }
    }

    await generateLinks(node)
  }

  const generateLinks = async (node: ContentNode) => {
    if (node.type !== 'link' || node.fields?.linkType !== 'internal') {
      return
    }

    if (node.fields.doc?.relationTo === 'pages') {
      const linkedPost = (await payload.findByID({
        collection: 'pages',
        id: node.fields.doc?.value as string,
        context: {
          select: ['breadcrumbs'],
        },
      })) as Page

      node.fields.url = linkedPost.breadcrumbs?.at(-1)?.url || '/404'
    }
  }

  if (data.content) {
    for (let node of data.content.root.children) {
      await walkContentNodes(node as ContentNode)
    }
  }

  return Response.json(data)
}
