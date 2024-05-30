import { cn } from "@/lib/utils";
import { type ClassValue } from "clsx";
import { type ComponentPropsWithoutRef, type ElementType } from "react";

export type DisplayVariant =
  | "heading-xl"
  | "heading-lg"
  | "heading-md"
  | "heading-sm"
  | "body-lg"
  | "body-md"
  | "body-sm"
  | "quote"
  | "code"
  | "code-block"
  | "list";

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
  "body-lg": "text-lg font-semibold leading-7",
  "body-md": "leading-7",
  "body-sm": "text-sm font-medium leading-5",
  quote: "mt-6 border-l-2 pl-6",
  code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
  "code-block":
    "mx-4 pl-2 relative rounded bg-muted py-[0.2rem] font-mono text-sm font-semibold overflow-x-auto text-nowrap",
  list: "my-6 ml-6 list-disc [&>li]:mt-2",
} as {
  [_ in DisplayVariant]: ClassValue;
};

export function Typography<C extends ElementType>({
  as,
  display,
  className,
  children,
  ...props
}: TypographyProps<C>) {
  const Component = as || "span";
  const Variant = display || "body-md";

  return (
    <Component className={cn(DISPLAY_CLASSES[Variant], className)} {...props}>
      {children}
    </Component>
  );
}
