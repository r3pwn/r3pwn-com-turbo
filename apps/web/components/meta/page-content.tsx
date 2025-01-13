import type { ContainerContent } from "../blocks/rich-text";
import { Fragment } from "react";
import { Page } from "@local/payload/types";
import { cn } from "@/lib/utils";
import RichTextNode from "../blocks/rich-text";
import "../../css/page-content.css";

type RichTextContent = Page["content"];

type PageContentProps = {
  content: RichTextContent;
  className?: string;
};

export function PageContent({ content, className }: PageContentProps) {
  if (!content?.root) {
    return <></>;
  }

  return (
    <div className={cn("[&>p]:my-1", className)}>
      {content.root.children.map((child, index) => (
        <Fragment key={index}>
          <RichTextNode content={child as ContainerContent<any>} />
        </Fragment>
      ))}
    </div>
  );
}
