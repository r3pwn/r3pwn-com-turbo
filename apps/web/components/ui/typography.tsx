import { cn } from "@/lib/utils";

export function TypographyH1 ({ className, children, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)} {...props}>
      {children}
    </h1>
  )
}

export function TypographyH2 ({ className, children, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2 className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)} {...props}>
      {children}
    </h2>
  )
}

export function TypographyH3 ({ className, children, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)} {...props}>
      {children}
    </h3>
  )
}

export function TypographyH4 ({ className, children, ...props }: React.ComponentProps<'h4'>) {
  return (
    <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)} {...props}>
      {children}
    </h4>
  )
}