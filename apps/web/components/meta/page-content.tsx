import { Fragment } from "react";
import { Page } from "@repo/payload-common/types";
import { type ContainerContent, RichTextNode } from "../content/rich-text-node";
import "../../css/page-content.css";

type RichTextContent = Page["content"];

type PageContentProps = {
  content: RichTextContent;
};

export function PageContent({ content }: PageContentProps) {
  if (!content?.root) {
    return <></>;
  }

  return (
    <div className="rich-text-root [&>p]:my-1">
      {content.root.children.map((child, index) => (
        <Fragment key={index}>
          <RichTextNode content={child as ContainerContent<any>} />
        </Fragment>
      ))}
    </div>
  );
}
