import { LinkTarget } from "@/lib/types";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ArrowForwardIos } from "@mui/icons-material";

type SiteHeaderProps = React.ComponentProps<"header"> & {
  links?: LinkTarget[];
};

export function SiteHeader({ links, ...props }: SiteHeaderProps) {
  return (
    <header className="border-b-2 flex" {...props}>
      <Drawer>
        <DrawerTrigger asChild className="hidden max-md:flex">
          <Button variant="ghost" size="icon" className="p-1 m-2 w-12 h-12">
            <HamburgerMenuIcon height={24} width={24} />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="w-[300px]">
          <DrawerHeader>
            <DrawerTitle>Navigation</DrawerTitle>
            <div className="mt-4 flex flex-col gap-2">
              {links?.map((link, index) => (
                <DrawerClose key={index} className="w-fit" asChild>
                  <Button variant="link" asChild>
                    <Link href={link.url}>
                      {link.label}
                      <span className="ml-2 text-xs">
                        <ArrowForwardIos
                          fontSize="inherit"
                          height={16}
                          width={16}
                        />
                      </span>
                    </Link>
                  </Button>
                </DrawerClose>
              ))}
            </div>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
      <Button
        variant="ghost"
        size="icon"
        className="p-1 m-2 w-12 h-12 max-md:ml-0"
        asChild
      >
        <Link href="/">
          <img src="/apple-touch-icon.png" />
        </Link>
      </Button>
      <div className="mt-auto mb-auto ml-4 gap-2 flex max-md:hidden">
        {links?.map((link, index) => (
          <Button variant="secondary" asChild key={index}>
            <Link href={link.url}>{link.label}</Link>
          </Button>
        ))}
      </div>
    </header>
  );
}