"use client";

import { DiscussionEmbed } from "disqus-react";

type Props = {
  url: string;
  identifier: string;
};

export function DiscussionNode({ url, identifier }: Props) {
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
