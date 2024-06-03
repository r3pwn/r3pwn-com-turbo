import { LinkTarget } from "@/lib/types";
import { Typography } from "../ui/typography";
import { SmartBreadcrumbs } from "./smart-breadcrumbs";

type PageHeaderProps = React.ComponentProps<"div"> & {
  title: string;
  subtitle?: string;
  breadcrumbs?: LinkTarget[];
};

export function PageHeader({
  breadcrumbs,
  title,
  subtitle,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div className={className} {...props}>
      {breadcrumbs && (
        <SmartBreadcrumbs breadcrumbs={breadcrumbs} className="mb-2" />
      )}
      <Typography as="h1" display="heading-xl">
        {title}
      </Typography>
      {subtitle && (
        <Typography display="heading-md" className="block mt-1">
          {subtitle}
        </Typography>
      )}
    </div>
  );
}
