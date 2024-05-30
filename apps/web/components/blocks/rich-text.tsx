import { RichTextBlock } from "@repo/payload-common/types";
import { ElementType, Fragment } from "react";
import { DisplayVariant, Typography } from "../ui/typography";

type RichTextProps = {
  content: RichTextBlock["content"];
};

export function RichText({ content }: RichTextProps) {
  return (
    <div className="rich-text-root">
      {content.root.children.map((child, index) => (
        <Fragment key={index}>
          <RichTextNode content={child as any} />
        </Fragment>
      ))}
    </div>
  );
}

const TextFormats = {
  BOLD: 1,
  ITALICS: 2,
  STRIKETHROUGH: 4,
  UNDERLINED: 8,
  CODE: 16,
};

const TextFormatClasses = {
  BOLD: "font-bold",
  ITALICS: "italic",
  STRIKETHROUGH: "line-through",
  UNDERLINED: "underline",
  CODE: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
};

const HeadingVariants = {
  h1: "heading-xl",
  h2: "heading-lg",
  h3: "heading-md",
  h4: "heading-sm",
} as { [_: string]: DisplayVariant };

type ContainerNodeProps = {
  content: RichTextBlock["content"]["root"];
  as?: ElementType;
  display?: DisplayVariant;
  className?: string;
};

function RichTextNode({ content }: ContainerNodeProps) {
  let componentTag = (content as any).tag;
  switch (content.type) {
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
      className="text-muted-foreground hover:underline hover:text-foreground"
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
