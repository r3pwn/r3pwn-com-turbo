import type { DisqusCommentsBlock } from "@repo/payload-common/types";
import DisqusWrapper from "./disqus-wrapper";

type Props = Omit<DisqusCommentsBlock, "blockType">;

export default function DisqusComments({ url, identifier }: Props) {
  return <DisqusWrapper url={url} identifier={identifier} />;
}
