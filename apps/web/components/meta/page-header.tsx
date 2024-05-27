import { cn } from "@/lib/utils";
import { TypographyH1 } from "../ui/typography";
import { BreadcrumbTarget, SmartBreadcrumbs } from "./smart-breadcrumbs";

type PageHeaderProps = React.ComponentProps<'header'> & {
  title: string;
  breadcrumbs: BreadcrumbTarget[];
}

export function PageHeader ({ breadcrumbs, title, className, ...props }: PageHeaderProps) {
  return (
    <header className={cn("", className)} {...props}>
      <SmartBreadcrumbs breadcrumbs={breadcrumbs} />
      <TypographyH1>
        {title}
      </TypographyH1>
    </header>
  )
}