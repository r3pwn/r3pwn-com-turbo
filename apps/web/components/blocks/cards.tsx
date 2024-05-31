import { CardsBlock, PayloadMedia } from "@repo/payload-common/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowForwardIos } from "@mui/icons-material";

type CardsProps = {
  cards: CardsBlock["cards"];
};

export function Cards({ cards }: CardsProps) {
  return (
    <div className="cards-block flex gap-4">
      {cards.map((card, index) => {
        return (
          <Link href={card.link}>
            <Card
              className="w-[350px] transition-colors hover:bg-muted"
              key={index}
            >
              <img
                className="rounded-t-xl"
                src={(card.image as PayloadMedia).url || ""}
              />
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-end">
                <Button variant="ghost" size="icon">
                  <ArrowForwardIos />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
