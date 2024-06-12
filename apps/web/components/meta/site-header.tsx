import { LinkTarget } from "@/lib/types";
import { Button } from "../ui/button";
import Link from "next/link";

type SiteHeaderProps = React.ComponentProps<"header"> & {
  links?: LinkTarget[];
};

export function SiteHeader({ links, ...props }: SiteHeaderProps) {
  return (
    <header className="border-b-2 flex" {...props}>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full p-1 m-2 w-12 h-12"
        asChild
      >
        <Link href="/">
          <img src="/apple-touch-icon.png" />
        </Link>
      </Button>
      <div className="mt-auto mb-auto ml-4 flex gap-2">
        {links?.map((link, index) => (
          <Button asChild variant="secondary">
            <Link href={link.url} key={index}>
              {link.label}
            </Link>
          </Button>
        ))}
      </div>
    </header>
  );
}
