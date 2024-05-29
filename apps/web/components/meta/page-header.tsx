import { Typography } from "../ui/typography";
import { BreadcrumbTarget, SmartBreadcrumbs } from "./smart-breadcrumbs";

type PageHeaderProps = React.ComponentProps<"header"> & {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbTarget[];
};

export function PageHeader({
  breadcrumbs,
  title,
  subtitle,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <header className={className} {...props}>
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
    </header>
  );
}
