import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator
} from "../ui/breadcrumb";

export type BreadcrumbTarget = {
  text: string;
  link: string;
}

type SmartBreadcrumbProps = React.ComponentProps<'nav'> & {
  breadcrumbs: BreadcrumbTarget[];
}

export function SmartBreadcrumbs ({ breadcrumbs, ...props }: SmartBreadcrumbProps) {
  return (
    <Breadcrumb {...props}>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => 
        <>
          <BreadcrumbItem key={`crumb-${index}`}>
            <BreadcrumbLink href={crumb.link}>{crumb.text}</BreadcrumbLink>
          </BreadcrumbItem>
          {index != breadcrumbs.length - 1 && <BreadcrumbSeparator key={`separator-${index}`} />}
        </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}