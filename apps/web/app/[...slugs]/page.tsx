import { notFound } from "next/navigation";
import { getPageByUrl, getPageList } from "../../providers/contentProvider";
import { PageHeader } from "@/components/meta/page-header";
import { PageContent } from "@/components/meta/page-content";

type Params = {
  slugs: string[];
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
  const { slugs } = params;
  const page = await getPageByUrl(`/${slugs.join("/")}`);

  if (!page) {
    return notFound();
  }

  const showHeader = !!page.title && !!page.subtitle;
  const pageBreadcrumbs = [
    { label: "Home", url: "/" },
    ...page.breadcrumbs!.map((crumb) => ({
      label: crumb.label || "",
      url: crumb.url || "",
    })),
  ];

  return (
    <div className="page-container">
      {showHeader ? (
        <PageHeader
          title={page.title}
          subtitle={page.subtitle || ""}
          breadcrumbs={pageBreadcrumbs}
          className="mb-6"
        />
      ) : (
        <></>
      )}
      <PageContent content={page.content} />
    </div>
  );
}