import type { Media } from "@local/payload/types";

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
        className="ml-auto mr-auto"
      ></img>
    </div>
  );
}
