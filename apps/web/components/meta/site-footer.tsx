import { getIcon } from "@repo/payload-common/icons";
import { NavigationData } from "@repo/payload-common/types";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = React.ComponentProps<"footer"> & {
  socialLinks?: NonNullable<NavigationData["footer"]>["socialLinks"];
  copyrightText?: string;
};

export function SiteFooter({ socialLinks, copyrightText, ...props }: Props) {
  return (
    <footer
      className="border-t-2 flex flex-col items-center mt-auto bg-card"
      {...props}
    >
      <div className="flex my-1 gap-1 flex-wrap">
        {socialLinks?.map((link, index) => (
          <SocialLink
            key={index}
            ariaLabel={link.ariaLabel || undefined}
            url={link.url || "/"}
            icon={link.icon || ""}
            openInNewTab={link.openInNewTab || false}
          />
        ))}
      </div>
      <Typography display="body-sm" className="mb-1 text-muted-foreground">
        {copyrightText}
      </Typography>
    </footer>
  );
}

type SocialLinkProps = {
  ariaLabel?: string;
  url: string;
  icon: string;
  openInNewTab?: boolean;
};

function SocialLink({ ariaLabel, url, icon, openInNewTab }: SocialLinkProps) {
  const Icon = getIcon(icon);
  return (
    <Button variant="secondary" size="icon" asChild>
      <Link
        aria-label={ariaLabel}
        href={url}
        target={openInNewTab ? "_blank" : undefined}
      >
        <Icon color="inherit" />
      </Link>
    </Button>
  );
}
