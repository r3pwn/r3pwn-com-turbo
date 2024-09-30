import { type CardBlock, type Media } from "@repo/payload-common/types";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowForwardIos } from "@mui/icons-material";

type CardsProps = {
  card: CardBlock;
};

export function CardNode({ card }: CardsProps) {
  return (
    <div className="cards-block flex flex-wrap gap-4">
      <Link href={card.link as string}>
        <Card className="min-w-[150px] max-w-[350px] transition-colors hover:bg-muted">
          <img
            className="rounded-t-xl"
            src={(card.image as Media).url || ""}
            alt={(card.image as Media).alt || ""}
            width={350}
            height={175}
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
    </div>
  );
}
