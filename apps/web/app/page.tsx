import DynamicPage, {
  generateMetadata as generatePageMetadata,
} from "./[...slugs]/page";

export async function generateMetadata() {
  return await generatePageMetadata({ params: { slugs: [""] } });
}

export default async function Page() {
  return await DynamicPage({ params: { slugs: [""] } });
}
