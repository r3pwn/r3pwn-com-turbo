import { getPageList } from "@/providers/contentProvider";
import { MetadataRoute } from "next/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getPageList();
  return pages
    .map((page) => ({
      url: `${process.env.SITE_HOST || ""}${page.url}`,
      lastModified: page.updatedAt,
    }))
    .sort((first, second) => {
      return first.url < second.url ? -1 : first.url > second.url ? 1 : 0;
    });
}
