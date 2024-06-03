import { LinkTarget } from "@/lib/types";
import { Button } from "../ui/button";
import Link from "next/link";

type SiteHeaderProps = React.ComponentProps<"header"> & {
  links?: LinkTarget[];
};

export function SiteHeader({ links, ...props }: SiteHeaderProps) {
  return (
    <header className="border-b-2" {...props}>
      <Link href="/">
        <Button variant="ghost" size="icon" className="rounded-full p-1 m-2">
          <img src="/apple-touch-icon.png" />
        </Button>
      </Link>
    </header>
  );
}
