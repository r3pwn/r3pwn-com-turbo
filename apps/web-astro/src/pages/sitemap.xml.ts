import { getPageList } from "@/providers/content-provider";

export async function GET() {
  const pages = (await getPageList()).sort((first, second) => {
    return first.url < second.url ? -1 : first.url > second.url ? 1 : 0;
  });

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          (page) => `<url>
          <loc>${process.env.SITE_HOST}${page.url}</loc>
          <lastmod>${new Date(page.updatedAt).toISOString()}</lastmod>
        </url>`
        )
        .join("")}
    </urlset>`
    // remove leading spaces
    .replace(/^ +/gm, "")
    .trimStart();

  return new Response(sitemapContent, {
    status: 200,
    headers: {
      "Content-type": "application/xml",
      // Instruct the Vercel edge to cache the file for 1 hour
      "Cache-control": "stale-while-revalidate, s-maxage=3600",
    },
  });
}
