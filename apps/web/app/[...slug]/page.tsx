type Params = {
  slug: string[];
};

type Props = {
  params: Params;
};

export async function generateStaticParams() {
  // Generate two pages at build time and the rest (3-100) on-demand
  return [{ slug: ["test"] }, { slug: ["testing", "page"] }];
}

export default async function Page({ params }: Props) {
  return (
    <div>
      <p>{params.slug[0]}</p>
      <p>{params.slug[1]}</p>
    </div>
  );
}
