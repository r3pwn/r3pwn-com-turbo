"use client";

import { DiscussionEmbed } from "disqus-react";
import type { DisqusCommentsBlock } from "@local/payload/types";

type Props = Omit<DisqusCommentsBlock, "blockType">;

export default function DisqusWrapper({ url, identifier }: Props) {
  if (!url || !identifier) {
    return <></>;
  }

  return (
    <DiscussionEmbed
      shortname="r3pwn"
      config={{
        url,
        identifier,
      }}
    />
  );
}
