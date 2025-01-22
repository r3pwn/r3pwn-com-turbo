// Icons added to this object will automatically appear in Payload, and will automatically support being displayed on the site
const iconList = [
  "email",
  "facebook",
  "github",
  "instagram",
  "linkedin",
  "reddit",
  "telegram",
  "twitter",
];

export const getSupportedIcons = function () {
  return iconList;
};

export const getIcon = async function (iconName: string) {
  try {
    const { default: iconComponent } = await import(`./icons/${iconName}`);
    return iconComponent;
  } catch (err) {
    const { default: iconComponent } = await import("./icons/broken-image");
    return iconComponent;
  }
};
