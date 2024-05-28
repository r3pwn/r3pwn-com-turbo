import { notFound } from "next/navigation";
import { getPageBySlug, getPageList } from "../../providers/contentProvider";
import { PageHeader } from "@/components/meta/page-header";

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
  const page = await getPageBySlug(slug);

  if (!page) {
    return notFound();
  }

  const pageBreadcrumbs = page.showBreadcrumbs
    ? [
        { label: "Home", url: "/" },
        ...page.breadcrumbs!.map((crumb) => ({
          label: crumb.label || "",
          url: crumb.url || "",
        })),
      ]
    : undefined;

  return (
    <div>
      {page.showHeader && (
        <PageHeader
          title={page.title}
          subtitle={page.subtitle || ""}
          breadcrumbs={pageBreadcrumbs}
        />
      )}
      <div>{JSON.stringify(page)}</div>
    </div>
  );
}
