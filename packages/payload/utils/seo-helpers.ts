import { Page } from "../types";

export const generatePreviewUrl = (doc: Page) =>
  `https://www.example.com${doc.breadcrumbs?.at(-1)?.url || ""}`;
