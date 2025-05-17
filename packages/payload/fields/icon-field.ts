import { SUPPORTED_ICONS } from "@local/icons";
import { Field } from "payload";

export const IconField = () => {
  return {
    name: "icon",
    type: "select",
    options: SUPPORTED_ICONS.map((iconName) => ({
      label: `${iconName.charAt(0).toUpperCase()}${iconName.slice(1)}`,
      value: iconName,
    })),
  } as Field;
};
