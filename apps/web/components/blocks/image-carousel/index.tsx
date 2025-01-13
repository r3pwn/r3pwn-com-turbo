import type { ImageCarouselBlock, Media } from "@local/payload/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../../ui/carousel";

type Props = Omit<ImageCarouselBlock, "blockType" | "images"> & {
  images: { image: Media }[];
};

export default function ImageCarousel({ images }: Props) {
  return (
    <Carousel className="flex place-content-center py-4 lg:w-[80%] lg:mx-auto max-h-[60vh]">
      <CarouselPrevious
        className="self-center"
        aria-label="Show previous image"
      />
      <CarouselContent className="-ml-5">
        {images
          .map((x) => x.image)
          .map((image, index) => (
            <CarouselItem
              key={index}
              className="flex justify-center items-center pl-5"
            >
              <img
                height={image.height || 1}
                width={image.width || 1}
                src={image.url || ""}
                alt={image.alt}
                className="max-h-[60vh] object-contain"
              ></img>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselNext className="self-center" aria-label="Show next image" />
    </Carousel>
  );
}
