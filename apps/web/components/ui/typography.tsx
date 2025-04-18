import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType } from "react";

const textVariants = cva("", {
  variants: {
    display: {
      "heading-xl":
        "scroll-m-20 tracking-tight text-4xl font-extrabold lg:text-5xl",
      "heading-lg":
        "scroll-m-20 tracking-tight text-3xl font-semibold first:mt-0",
      "heading-md": "scroll-m-20 tracking-tight text-2xl font-semibold",
      "heading-sm": "scroll-m-20 tracking-tight text-xl font-semibold",
      "body-lg": "text-lg font-semibold leading-7",
      "body-md": "leading-7",
      "body-sm": "text-sm font-medium leading-5",
      quote: "mt-6 border-l-2 pl-6",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      "code-block":
        "mx-4 my-4 pl-1 relative rounded-lg bg-muted py-[0.2rem] font-mono text-sm font-semibold overflow-x-auto text-nowrap",
      list: "my-4 ml-6 list-disc [&>li]:mt-2",
    },
  },
  defaultVariants: {
    display: "body-md",
  },
});

export type DisplayVariant = VariantProps<typeof textVariants>["display"];

export type TypographyProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T> &
  VariantProps<typeof textVariants>;

export function Typography<C extends ElementType>({
  as,
  display,
  className,
  children,
  ...props
}: TypographyProps<C>) {
  const Component = as || "span";

  return (
    <Component className={cn(textVariants({ display }), className)} {...props}>
      {children}
    </Component>
  );
}
