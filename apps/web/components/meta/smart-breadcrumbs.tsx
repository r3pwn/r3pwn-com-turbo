import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { LinkTarget } from "@/lib/types";
import { ArrowBackIos } from "@mui/icons-material";

type SmartBreadcrumbProps = React.ComponentProps<"nav"> & {
  breadcrumbs: LinkTarget[];
};

export function SmartBreadcrumbs({
  breadcrumbs,
  ...props
}: SmartBreadcrumbProps) {
  const previousCrumb = breadcrumbs.at(-2);
  return (
    <Breadcrumb {...props}>
      <BreadcrumbList className="flex max-md:hidden">
        {breadcrumbs.map((crumb, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              {index === breadcrumbs.length - 1 && (
                <div className="text-primary">{crumb.label}</div>
              )}
              {index !== breadcrumbs.length - 1 && (
                <BreadcrumbLink href={crumb.url}>{crumb.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index != breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
      {previousCrumb ? (
        <BreadcrumbList className="hidden max-md:flex">
          <BreadcrumbItem>
            <BreadcrumbLink
              className="flex items-center"
              href={previousCrumb.url}
            >
              <ArrowBackIos fontSize="inherit" height={16} width={16} />
              {previousCrumb.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      ) : (
        <></>
      )}
    </Breadcrumb>
  );
}
