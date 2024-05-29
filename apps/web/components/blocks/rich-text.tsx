import { RichTextBlock } from "@repo/payload-common/types";

type RichTextProps = {
  content: RichTextBlock["content"];
};

export function RichText({ content }: RichTextProps) {
  return (
    <div className="rich-text-root">
      {content.root.children.map((child, index) => (
        <RichTextNode content={child as any} key={index} />
      ))}
    </div>
  );
}

type RichTextNodeProps = {
  content: RichTextBlock["content"]["root"];
};

export function RichTextNode({ content }: RichTextNodeProps) {
  return <div>{JSON.stringify(content)}</div>;
}
