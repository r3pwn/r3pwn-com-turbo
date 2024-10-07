import { type Media } from "@repo/payload-common/types";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowForwardIos } from "@mui/icons-material";
import { Button } from "../ui/button";

type Props = {
  title: string;
  description?: string;
  image?: Media;
  link?: string;
};

export function CardLink({ title, description, link, image }: Props) {
  return (
    <Link href={link as string} className="flex">
      <Card className="flex flex-col min-w-[150px] max-w-[350px] transition-colors hover:bg-muted">
        <img
          className="rounded-t-xl"
          src={(image as Media).url || ""}
          alt={(image as Media).alt || ""}
          width={350}
          height={175}
        />
        <CardHeader className="mb-auto">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-end">
          <Button variant="ghost" size="icon" component="div">
            <ArrowForwardIos />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
