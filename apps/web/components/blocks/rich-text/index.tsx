import type { Media, Page } from "@local/payload/types";
import type { ElementType } from "react";
import { type DisplayVariant, Typography } from "../../ui/typography";
import ImageNode from "./image-node";
import Link from "next/link";
import { renderBlock } from "../render-block";
import {
  getTextClasses,
  HeadingVariants,
  TextFormatClasses,
  TextFormats,
} from "./common";

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

export default function RichTextNode({ content }: ContainerNodeProps) {
  const componentTag = (content as any).tag;

  switch (content.type) {
    case "upload":
      return <ImageNode content={(content as ContainerContent<Media>).value} />;
    case "inlineBlock":
    case "block":
      return renderBlock(content.fields?.blockType, content.fields);
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
    case "autolink":
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
    <Link
      href={(content as any).fields?.url}
      target={(content as any).fields?.newTab ? "_blank" : undefined}
      className={TextFormatClasses.LINK}
    >
      {content.children.map((textNode, index) => (
        <RichTextNode content={textNode as any} key={index} />
      ))}
    </Link>
  );
}

function QuoteNode({ content }: ContainerNodeProps) {
  let display: DisplayVariant = "quote";
  if (
    content.children.every(
      (textNode) =>
        textNode.type === "linebreak" ||
        textNode.type === "autolink" ||
        (textNode.format as number) & TextFormats.CODE
    )
  ) {
    display = "code-block";
  }

  return (
    <Typography display={display} as="div" className="empty:opacity-0">
      {content.children.map((textNode, index) => (
        <RichTextNode content={textNode as any} key={index} />
      ))}
    </Typography>
  );
}
