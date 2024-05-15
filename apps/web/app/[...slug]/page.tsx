import { getPageList } from "../../providers/contentProvider";

type Params = {
  slug: string[];
};

type Props = {
  params: Params;
};

export async function generateStaticParams() {
  const pages = await getPageList();
  return pages.map((page) => ({
    slug: page.url.split("/").filter((slug) => !!slug),
  }));
}

export default async function Page({ params }: Props) {
  return (
    <div>
      <p>{params.slug[0]}</p>
      <p>{params.slug[1]}</p>
    </div>
  );
}
