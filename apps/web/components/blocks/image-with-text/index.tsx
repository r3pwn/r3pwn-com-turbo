import type { Media, ImageWithTextBlock } from "@local/payload/types";
import { PageContent } from "../../meta/page-content";

type Props = Omit<ImageWithTextBlock, "blockType"> & {
  image: Media;
};

export default function ImageWithText({ image, text }: Props) {
  return (
    <div className="flex flex-wrap gap-4 mb-10 max-sm:flex-col max-sm:flex-nowrap max-sm:w-fit">
      <img
        src={image.url || ""}
        alt={image.alt}
        className="w-[300px] h-auto aspect-square rounded-full max-sm:mx-auto"
      ></img>
      <PageContent content={text as any} className="sm:basis-[300px] grow" />
    </div>
  );
}
