const REVALIDATE_API_SECRET = process.env.REVALIDATE_SECRET || "";

const commonHeaders = (): HeadersInit => ({
  "x-prerender-revalidate": REVALIDATE_API_SECRET,
});

export const revalidatePages = async (pages: string[]) => {
  await Promise.all(
    pages.map((page) => {
      return fetch(`${process.env.SITE_HOST}${page}`, {
        method: "HEAD",
        headers: commonHeaders(),
      });
    })
  );
};

export const revalidateTags = async (tags: string[]) => {
  console.log("TODO: Revalidate tags:", tags);
  return;
};
