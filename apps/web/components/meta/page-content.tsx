import { Fragment } from "react";
import { Page } from "@repo/payload-common/types";
import { type ContainerContent, RichTextNode } from "../content/rich-text-node";
import "../../css/page-content.css";
import { cn } from "@/lib/utils";

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
