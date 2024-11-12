import { Media, type ImageWithTextBlock } from "@repo/payload-common/types";
import { PageContent } from "../meta/page-content";

type Props = {
  image: Media;
  text: ImageWithTextBlock["text"];
};

export function ImageWithTextNode({ image, text }: Props) {
  return (
    <div className="flex flex-wrap gap-4 mb-10 max-sm:flex-col max-sm:flex-nowrap max-sm:w-fit">
      <img
        src={image.url || ""}
        className="w-[300px] h-auto aspect-square rounded-full max-sm:mx-auto"
      ></img>
      <PageContent content={text as any} className="sm:basis-[300px] grow" />
    </div>
  );
}
