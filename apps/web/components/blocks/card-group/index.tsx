import type { Page, CardGroupBlock, Media } from "@repo/payload-common/types";
import CardLink from "./card-link";

type Props = {
  cards: CardGroupBlock["cards"];
};

export default function CardGroup({ cards }: Props) {
  return (
    <div className="cards-block flex flex-wrap flex-row gap-4 max-sm:flex-col max-sm:flex-nowrap max-sm:w-fit max-sm:mx-auto">
      {cards?.map((card, index) => (
        <CardLink
          key={index}
          title={card.title}
          description={card.description || undefined}
          image={card.image as Media | undefined}
          link={card.link as Page | undefined}
        />
      ))}
    </div>
  );
}
