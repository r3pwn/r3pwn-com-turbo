export const getValidatedUrl = (url: string) => {
  return url
    .toLowerCase()
    .replaceAll("_", "-")
    .replace(/\.html$/, "");
};
