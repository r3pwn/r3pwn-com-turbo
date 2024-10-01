import { type CardGroupBlock, type Media } from "@repo/payload-common/types";
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

type CardNodeProps = {
  cards: CardGroupBlock["cards"];
};

type CardLinkProps = {
  title: string;
  description?: string;
  image?: Media;
  link?: string;
};

function CardLink({ title, description, link, image }: CardLinkProps) {
  return (
    <Link href={link as string}>
      <Card className="min-w-[150px] max-w-[350px] transition-colors hover:bg-muted">
        <img
          className="rounded-t-xl"
          src={(image as Media).url || ""}
          alt={(image as Media).alt || ""}
          width={350}
          height={175}
        />
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-end">
          <Button variant="ghost" size="icon">
            <ArrowForwardIos />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

export function CardGroupNode({ cards }: CardNodeProps) {
  return (
    <div className="cards-block flex flex-wrap gap-4">
      {cards?.map((card, index) => (
        <CardLink
          key={index}
          title={card.title}
          description={card.description || undefined}
          image={card.image as Media | undefined}
          link={card.link as string | undefined}
        />
      ))}
    </div>
  );
}
