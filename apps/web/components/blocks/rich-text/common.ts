import type { DisplayVariant } from "../../ui/typography";

export const TextFormats = {
  BOLD: 1,
  ITALICS: 2,
  STRIKETHROUGH: 4,
  UNDERLINED: 8,
  CODE: 16,
};

export const TextFormatClasses = {
  BOLD: "font-bold",
  ITALICS: "italic",
  STRIKETHROUGH: "line-through",
  UNDERLINED: "underline",
  CODE: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
  LINK: "text-muted-foreground hover:underline hover:text-foreground",
};

export const HeadingVariants = {
  h1: "heading-xl",
  h2: "heading-lg",
  h3: "heading-md",
  h4: "heading-sm",
} as { [_: string]: DisplayVariant };

export function getTextClasses(textFormat: number) {
  if (!Number(textFormat)) {
    return "";
  }
  let classes = [];
  if (textFormat & TextFormats.CODE) {
    classes.push(TextFormatClasses.CODE);
  }
  if (textFormat & TextFormats.UNDERLINED) {
    classes.push(TextFormatClasses.UNDERLINED);
  }
  if (textFormat & TextFormats.STRIKETHROUGH) {
    classes.push(TextFormatClasses.STRIKETHROUGH);
  }
  if (textFormat & TextFormats.ITALICS) {
    classes.push(TextFormatClasses.ITALICS);
  }
  if (textFormat & TextFormats.BOLD) {
    classes.push(TextFormatClasses.BOLD);
  }
  return classes.join(" ");
}
