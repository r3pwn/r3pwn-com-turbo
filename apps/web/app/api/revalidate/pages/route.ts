import { Responses, validateToken } from "@/lib/revalidate";
import { revalidatePath } from "next/cache";

export const POST = async (req: Request) => {
  // Check for secret to confirm this is a valid request
  if (!validateToken(req)) {
    return Responses.invalidSecret;
  }

  let body;
  try {
    body = await req.json();
    if (!req.body || !Array.isArray(body)) {
      return Responses.invalidBody;
    }
  } catch {
    return Responses.invalidBody;
  }

  try {
    const pages = body as string[];
    for (let page of pages) {
      revalidatePath(page);
    }
    return Responses.success;
  } catch (err) {
    console.error(err);
    return Responses.unknownError;
  }
};
