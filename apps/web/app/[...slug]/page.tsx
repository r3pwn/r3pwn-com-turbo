import { notFound } from "next/navigation";
import { getPageBySlug, getPageList } from "../../providers/contentProvider";
import { PageHeader } from "@/components/meta/page-header";
import { RichText } from "@/components/blocks/rich-text";

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
  const { slug } = params;
  const page = await getPageBySlug(slug.at(-1) || "");

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
    <div>
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
      <RichText content={page.content} />
    </div>
  );
}
