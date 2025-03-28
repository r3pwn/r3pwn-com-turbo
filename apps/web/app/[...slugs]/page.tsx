import { notFound, permanentRedirect } from "next/navigation";
import { getPageByUrl, getPageList } from "@/providers/content-provider";
import { PageHeader } from "@/components/meta/page-header";
import { PageContent } from "@/components/meta/page-content";
import { Metadata } from "next";
import { getValidatedUrl } from "@/lib/page-redirect";

type Params = {
  slugs: string[];
};

type Props = {
  params: Promise<Params>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slugs } = await params;

  const url = `/${slugs.join("/")}`;
  const page = await getPageByUrl(url);

  if (!page) {
    return {};
  }

  const title = page.meta?.title || page.title;

  return {
    title: `${title} | r3pwn`,
    description: page.meta?.description || page.subtitle || undefined,
    openGraph: {
      siteName: "r3pwn",
      url: `${process.env.SITE_HOST}${url}`,
      images: (page.meta?.image as string) || undefined,
    },
  };
}

export async function generateStaticParams() {
  const pages = await getPageList();
  return pages.map((page) => ({
    slug: page.url.split("/").filter((slug) => !!slug),
  }));
}

export default async function Page({ params }: Props) {
  const { slugs } = await params;

  const pageUrl = `/${slugs.join("/")}`;
  const validatedUrl = getValidatedUrl(pageUrl);

  if (pageUrl !== validatedUrl) {
    return permanentRedirect(validatedUrl);
  }

  const page = await getPageByUrl(pageUrl);

  if (!page || (page as any).error) {
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
    <div className="page-container mb-4">
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
      <PageContent content={page.content} className="rich-text-root" />
    </div>
  );
}
