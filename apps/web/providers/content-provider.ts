import { getPayload } from "payload";
import { unstable_cache } from "next/cache";
import config from "@local/payload/config";

const payload = await getPayload({
  config,
});

type AbridgedPageData = {
  title: string;
  url: string;
  updatedAt: string;
};

export const getPageList = unstable_cache(
  async () => {
    const data = await payload.find({
      collection: "pages",
      select: {
        title: true,
        url: true,
        updatedAt: true,
      },
    });

    return data.docs as AbridgedPageData[];
  },
  ["pages"],
  { revalidate: 3600, tags: ["pages"] }
);

export const getPageByUrl = async (url: string) => {
  try {
    const data = await payload.find({
      collection: "pages",
      limit: 1,
      where: {
        url: {
          equals: url,
        },
      },
      select: {
        title: true,
        subtitle: true,
        breadcrumbs: true,
        content: true,
        meta: true,
      },
    });

    return data.docs.at(0);
  } catch {
    return null;
  }
};

export const getNavigation = unstable_cache(
  async () => {
    return await payload.findGlobal({
      slug: "navigation",
    });
  },
  ["navigation"],
  { revalidate: 3600, tags: ["navigation"] }
);
