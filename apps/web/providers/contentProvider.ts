const { CMS_HOST } = process.env;

type AbridgedPageData = {
  title: string;
  url: string;
  postedDate: string;
};

export const getPageList = async () => {
  const res = await fetch(`${CMS_HOST}/api/pages/list`);
  return (await res.json()) as AbridgedPageData[];
};
