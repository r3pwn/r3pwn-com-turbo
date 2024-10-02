import DynamicPage from "./[...slugs]/page";

export default async function Page() {
  return await DynamicPage({ params: { slugs: [""] } });
}
