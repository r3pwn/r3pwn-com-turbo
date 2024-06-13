import DynamicPage from "./[...slug]/page";

export default async function Page() {
  return await DynamicPage({ params: { slug: ["/index"] } });
}
