import configPromise from '@payload-config'
import { LinkFields } from '@payloadcms/richtext-lexical'
import { getPayload } from 'payload'
import { generatePageLink } from '../../../../utils/internal-links'
import { PageData } from '@repo/payload-common/types'

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

  const data = await payload.findByID({
    collection: 'posts',
    id: params.id,
    depth: 0,
  })

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
        collection: node.fields.doc?.relationTo,
        id: node.fields.doc?.value as string,
        context: {
          select: ['breadcrumbs'],
        },
      })) as PageData

      console.log(linkedPost)

      node.fields.url = '' //generatePageLink(linkedPost)
    }
  }

  for (let node of data.content!.root.children) {
    await walkContentNodes(node as ContentNode)
  }

  return Response.json(data)
}
