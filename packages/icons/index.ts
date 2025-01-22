export const SUPPORTED_ICONS = [
  "email",
  "facebook",
  "github",
  "instagram",
  "linkedin",
  "reddit",
  "telegram",
  "twitter",
];

export const getIcon = async function (iconName: string) {
  try {
    const { default: iconResource } = await import(
      `./resources/${iconName}.svg`
    );
    return iconResource;
  } catch (err) {
    const { default: iconResource } = await import(
      "./resources/broken-image.svg"
    );
    return iconResource;
  }
};
