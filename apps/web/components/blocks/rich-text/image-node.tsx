import type { Media } from "@repo/payload-common/types";

type Props = {
  content: Media;
};

export default function ImageNode({ content }: Props) {
  if (!content.url) {
    return <></>;
  }

  return (
    <div className="content-image">
      <img
        height={content.height || 1}
        width={content.width || 1}
        src={content.url || ""}
        alt={content.alt}
      ></img>
    </div>
  );
}
