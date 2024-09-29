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

const payload = await getPayload({
  config: configPromise,
})

const walkContentNodes = async (node: ContentNode) => {
  if (node.children?.length) {
    for (let childNode of node.children) {
      await walkContentNodes(childNode)
    }
  }

  await generateLinks(node)
  await populateMedia(node)
}

const generateLinks = async (node: ContentNode) => {
  if (node.type !== 'link' || node.fields?.linkType !== 'internal') {
    return
  }

  if (node.fields.doc?.relationTo === 'pages') {
    const linkedPage = (await payload.findByID({
      collection: 'pages',
      id: node.fields.doc?.value as string,
      context: {
        select: ['breadcrumbs'],
      },
    })) as Page

    node.fields.url = linkedPage.breadcrumbs?.at(-1)?.url || '/404'
  }
}

const populateMedia = async (node: ContentNode) => {
  if (node.type !== 'upload' || node.relationTo !== 'media') {
    return
  }

  const linkedMedia = (await payload.findByID({
    collection: 'media',
    id: node.value as string | number,
    context: {
      select: ['alt', 'url'],
    },
  })) as Page

  node.value = linkedMedia
}

export const GET = async (_: Request, { params }: { params: { id: string } }) => {
  const data = (await payload.findByID({
    collection: 'pages',
    id: params.id,
    depth: 0,
  })) as Page

  if (data.content) {
    for (let node of data.content.root.children) {
      await walkContentNodes(node as ContentNode)
    }
  }

  return Response.json(data)
}
