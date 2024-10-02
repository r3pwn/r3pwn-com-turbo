const REVALIDATE_API_PREFIX = `${process.env.SITE_HOST}/api/revalidate`
const REVALIDATE_API_SECRET = process.env.REVALIDATE_SECRET || ''

const commonHeaders = (): HeadersInit => ({
  'X-REVALIDATE-SECRET': REVALIDATE_API_SECRET,
})

export const revalidatePages = async (pages: string[]) => {
  return await fetch(`${REVALIDATE_API_PREFIX}/pages`, {
    method: 'POST',
    body: JSON.stringify(pages),
    headers: commonHeaders(),
  })
}

export const revalidateTags = async (tags: string[]) => {
  return await fetch(`${REVALIDATE_API_PREFIX}/tags`, {
    method: 'POST',
    body: JSON.stringify(tags),
    headers: commonHeaders(),
  })
}
