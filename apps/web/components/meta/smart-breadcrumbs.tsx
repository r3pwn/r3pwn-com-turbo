import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export type BreadcrumbTarget = {
  label: string;
  url: string;
};

type SmartBreadcrumbProps = React.ComponentProps<"nav"> & {
  breadcrumbs: BreadcrumbTarget[];
};

export function SmartBreadcrumbs({
  breadcrumbs,
  ...props
}: SmartBreadcrumbProps) {
  return (
    <Breadcrumb {...props}>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <>
            <BreadcrumbItem key={`crumb-${index}`}>
              {index === breadcrumbs.length - 1 && <div>{crumb.label}</div>}
              {index !== breadcrumbs.length - 1 && (
                <BreadcrumbLink href={crumb.url}>{crumb.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index != breadcrumbs.length - 1 && (
              <BreadcrumbSeparator key={`separator-${index}`} />
            )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}