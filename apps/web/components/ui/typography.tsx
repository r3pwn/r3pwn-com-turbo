import { cn } from "@/lib/utils";
import { type ClassValue } from "clsx";
import { type ComponentPropsWithoutRef, type ElementType } from "react";

type DisplayVariant =
  | "heading-xl"
  | "heading-lg"
  | "heading-md"
  | "heading-sm"
  | "body-lg"
  | "body-md"
  | "body-sm"
  | "quote"
  | "code";

type TypographyProps<T extends ElementType> = {
  as?: T;
  display?: DisplayVariant;
} & ComponentPropsWithoutRef<T>;

const DISPLAY_CLASSES = {
  "heading-xl":
    "scroll-m-20 tracking-tight text-4xl font-extrabold lg:text-5xl",
  "heading-lg": "scroll-m-20 tracking-tight text-3xl font-semibold first:mt-0",
  "heading-md": "scroll-m-20 tracking-tight text-2xl font-semibold",
  "heading-sm": "scroll-m-20 tracking-tight text-xl font-semibold",
  "body-lg": "text-lg font-semibold leading-7 [&:not(:first-child)]:mt-6",
  "body-md": "leading-7 [&:not(:first-child)]:mt-6",
  "body-sm": "text-sm font-medium leading-5 [&:not(:first-child)]:mt-6",
  quote: "mt-6 border-l-2 pl-6 italic",
  code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
} as {
  [k in DisplayVariant]: ClassValue;
};

export function Typography<C extends ElementType>({
  as,
  display,
  className,
  children,
  ...props
}: TypographyProps<C>) {
  const Component = as || "span";
  const Variant = display || "heading-sm";

  return (
    <Component className={cn(DISPLAY_CLASSES[Variant], className)} {...props}>
      {children}
    </Component>
  );
}
