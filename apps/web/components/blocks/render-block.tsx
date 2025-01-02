export const renderBlock = async (slug: string, data: any) => {
  if (!slug) {
    throw new Error("Component slug cannot be empty");
  }

  const component = await import(`./${slug}`);

  if (!component || !component.default) {
    console.warn(
      `Component '${slug}' does not exist or does not have a default export.`
    );
    return <></>;
  }
  return component.default(data);
};
