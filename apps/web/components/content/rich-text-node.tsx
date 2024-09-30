import { ElementType } from "react";
import { DisplayVariant, Typography } from "../ui/typography";
import { HeadingVariants, TextFormatClasses, TextFormats } from "./constants";
import { type Media, type Page } from "@repo/payload-common/types";
import { ImageNode } from "./image-node";
import { CardNode } from "./card-node";

type RichTextContent = Page["content"];

export type ContainerContent<T> = NonNullable<RichTextContent>["root"] & {
  value: T;
  fields?: any;
};

type ContainerNodeProps = {
  content: ContainerContent<any>;
  as?: ElementType;
  display?: DisplayVariant;
  className?: string;
};

export function RichTextNode({ content }: ContainerNodeProps) {
  const componentTag = (content as any).tag;

  switch (content.type) {
    case "upload":
      return <ImageNode content={(content as ContainerContent<Media>).value} />;
    case "block":
      switch (content.fields?.blockType) {
        case "card":
          return <CardNode card={content.fields} />;
      }
      return <Typography>DEBUG: {JSON.stringify(content)}</Typography>;
    case "heading":
      return (
        <ContainerNode
          content={content}
          as={componentTag}
          display={HeadingVariants[componentTag] || "body-lg"}
        />
      );
    case "horizontalrule":
      return <hr className="my-4" />;
    case "linebreak":
      return <br />;
    case "link":
      return <LinkNode content={content} />;
    case "list":
      return (
        <ContainerNode
          content={content}
          as={componentTag}
          display="list"
          className={componentTag === "ol" ? "list-decimal" : "list-disc"}
        />
      );
    case "listitem":
      return <ContainerNode content={content} as="li" />;
    case "paragraph":
      return <ContainerNode content={content} as="p" />;
    case "quote":
      return <QuoteNode content={content} />;
    case "text":
      return (
        <Typography
          className={getTextClasses(content.format as unknown as number)}
        >
          {(content as any).text}
        </Typography>
      );
    default:
      console.warn(`Unknown content type ${content.type}`);
  }
  return <Typography>DEBUG: {JSON.stringify(content)}</Typography>;
}

function ContainerNode({ content, ...extras }: ContainerNodeProps) {
  return (
    <Typography {...extras}>
      {content.children.map((textNode, index) => (
        <RichTextNode content={textNode as any} key={index} />
      ))}
    </Typography>
  );
}

function LinkNode({ content }: ContainerNodeProps) {
  return (
    <Typography
      as="a"
      className={TextFormatClasses.LINK}
      href={(content as any).fields?.url}
      target={(content as any).fields?.newTab ? "_blank" : undefined}
    >
      {content.children.map((textNode, index) => (
        <RichTextNode content={textNode as any} key={index} />
      ))}
    </Typography>
  );
}

function QuoteNode({ content }: ContainerNodeProps) {
  let display: DisplayVariant = "quote";
  if (
    content.children.every(
      (textNode) =>
        textNode.type === "linebreak" ||
        (textNode.format as number) & TextFormats.CODE
    )
  ) {
    display = "code-block";
  }

  return (
    <Typography display={display} as={display === "quote" ? "span" : "div"}>
      {content.children.map((textNode, index) => (
        <RichTextNode content={textNode as any} key={index} />
      ))}
    </Typography>
  );
}

function getTextClasses(textFormat: number) {
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
