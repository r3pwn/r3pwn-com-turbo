import { Responses, validateToken } from "@/lib/revalidate";
import { revalidateTag } from "next/cache";

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
    const tags = body as string[];
    for (let tag of tags) {
      revalidateTag(tag);
    }
    return Responses.success;
  } catch (err) {
    console.error(err);
    return Responses.unknownError;
  }
};
