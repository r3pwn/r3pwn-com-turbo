import configPromise from '@payload-config'
import { LinkFields } from '@payloadcms/richtext-lexical'
import { Page } from '@repo/payload-common/types'
import { getPayload, PaginatedDocs } from 'payload'

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
  await populateBlocks(node)
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

const populateBlocks = async (node: ContentNode) => {
  if (node.type !== 'block') {
    return
  }

  await populateCardGroup(node)
  await populateImageCarousel(node)
}

const populateCardGroup = async (node: ContentNode) => {
  if (node.fields?.blockType !== 'card-group') {
    return
  }

  const imageIds = []
  const linkIds = []

  for (let card of node.fields.cards as any[]) {
    if (card?.image) {
      imageIds.push(card?.image)
    }
    if (card?.link) {
      linkIds.push(card?.link)
    }
  }

  let images = {} as any

  if (imageIds.length) {
    const imagesResponse = await payload.find({
      collection: 'media',
      context: {
        select: ['id', 'alt', 'url'],
      },
      where: {
        or: imageIds.map((imageId) => ({
          id: {
            equals: imageId,
          },
        })),
      },
    })

    images = imagesResponse.docs.reduce((previous, doc) => {
      previous[doc.id] = doc
      return previous
    }, {} as any)
  }

  let links = {} as any

  if (linkIds.length) {
    const linksResponse = await payload.find({
      collection: 'pages',
      context: {
        select: ['id', 'breadcrumbs'],
      },
      where: {
        or: linkIds.map((linkId) => ({
          id: {
            equals: linkId,
          },
        })),
      },
    })

    links = linksResponse.docs.reduce((previous, doc) => {
      previous[doc.id] = doc
      return previous
    }, {} as any)
  }

  for (let card of node.fields.cards as any[]) {
    if (card?.image) {
      card.image = images[card.image as number]
    }
    if (card?.link) {
      card.link = links[card.link as string].breadcrumbs?.at(-1)?.url || '/404'
    }
  }
}

const populateImageCarousel = async (node: ContentNode) => {
  if (node.fields?.blockType !== 'image-carousel') {
    return
  }

  const imageIds = []
  for (let imageObj of node.fields.images as any[]) {
    if (imageObj?.image) {
      imageIds.push(imageObj?.image)
    }
  }

  let images = {} as any

  if (imageIds.length) {
    const imagesResponse = await payload.find({
      collection: 'media',
      context: {
        select: ['id', 'alt', 'url'],
      },
      where: {
        or: imageIds.map((imageId) => ({
          id: {
            equals: imageId,
          },
        })),
      },
    })

    images = imagesResponse.docs.reduce((previous, doc) => {
      previous[doc.id] = doc
      return previous
    }, {} as any)
  }

  for (let imageObj of node.fields.images as any[]) {
    if (imageObj?.image) {
      imageObj.image = images[imageObj.image as number]
    }
  }
}

export const GET = async (_: Request, { params }: { params: { url: string } }) => {
  const docs = (await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 1,
    where: {
      url: {
        equals: params.url,
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

  const data = docs.docs[0]

  if (data.content) {
    for (let node of data.content.root.children) {
      await walkContentNodes(node as ContentNode)
    }
  }

  return Response.json(data)
}
