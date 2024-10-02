const SECRET_HEADER = "X-REVALIDATE-SECRET";

export const validateToken = (req: Request) =>
  req.headers?.get(SECRET_HEADER.toLowerCase()) ===
  process.env.REVALIDATE_SECRET;

export const Responses = {
  success: Response.json({ revalidated: true }),
  invalidSecret: Response.json(
    { message: "Invalid token" },
    {
      status: 401,
    }
  ),
  invalidBody: Response.json(
    { message: "Invalid request body" },
    {
      status: 400,
    }
  ),
  unknownError: Response.json(
    { message: "Error revalidating" },
    {
      status: 500,
    }
  ),
};
