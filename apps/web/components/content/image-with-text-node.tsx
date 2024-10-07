import { type ImageWithTextBlock } from "@repo/payload-common/types";
import { PageContent } from "../meta/page-content";

type Props = {
  image: string;
  text: ImageWithTextBlock["text"];
};

export function ImageWithTextNode({ image, text }: Props) {
  return (
    <div className="flex flex-wrap gap-4 max-sm:flex-col max-sm:flex-nowrap max-sm:w-fit max-sm:mx-auto">
      <img
        src={image}
        className="w-[300px] h-auto aspect-square rounded-full"
      ></img>
      <PageContent content={text as any} />
    </div>
  );
}
