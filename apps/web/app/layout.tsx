import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/meta/site-header";
import { getNavigation } from "@/providers/contentProvider";
import { PageData } from "@repo/payload-common/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "r3pwn",
  description: "Description",
  openGraph: {
    title: "r3pwn",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const nav = await getNavigation();

  const navLinks = nav.header?.navigationLinks?.map((link) => {
    return {
      label: link.label,
      url: (link.target as PageData)?.breadcrumbs?.at(-1)?.url || "/",
    };
  });

  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <SiteHeader links={navLinks || []} />
        {children}
      </body>
    </html>
  );
}
