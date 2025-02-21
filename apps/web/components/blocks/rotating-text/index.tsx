import type { RotatingTextBlock } from "@local/payload/types";
import RotatingText from "./rotating-text";

type Props = Omit<RotatingTextBlock, "blockType">;

export default function RotatingTextComponent({ rotatingText }: Props) {
  return (
    <RotatingText
      texts={rotatingText?.map((text) => text.word) || []}
      mainClassName="bg-[#00CCFF] text-current font-bold overflow-hidden px-2 py-0.5 justify-center rounded-lg"
      staggerFrom={"last"}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-120%" }}
      staggerDuration={0.025}
      splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
      transition={{ type: "spring", damping: 30, stiffness: 400 }}
      rotationInterval={2000}
    />
  );
}
