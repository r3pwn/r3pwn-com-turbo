import * as React from "react";

import { cn } from "@/lib/utils";
import { Typography, TypographyProps } from "./typography";
import { ElementType } from "react";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export function CardTitle<C extends ElementType>({
  children,
  as,
  className,
  ...props
}: TypographyProps<C>) {
  return (
    <Typography as={as || "h2"} display="body-lg" {...props}>
      {children}
    </Typography>
  );
}

export function CardDescription<C extends ElementType>({
  children,
  as,
  className,
  ...props
}: TypographyProps<C>) {
  return (
    <Typography
      as={as || "p"}
      display="body-sm"
      className={cn("text-muted-foreground !mt-0", className)}
      {...props}
    >
      {children}
    </Typography>
  );
}

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardContent };
