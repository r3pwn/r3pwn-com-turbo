import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/meta/site-header";
import { getNavigation } from "@/providers/content-provider";
import { Page } from "@local/payload/types";
import { JSX } from "react";
import { SiteFooter } from "@/components/meta/site-footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../css/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const nav = await getNavigation();

  const navLinks = nav.header?.navigationLinks?.map((link) => {
    return {
      label: link.label,
      url: (link.target as Page)?.url || "/",
    };
  });

  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <SiteHeader links={navLinks || []} />
        {children}
        <SpeedInsights />
        <SiteFooter
          socialLinks={nav.footer?.socialLinks || []}
          copyrightText={nav.footer?.copyrightText || ""}
        />
      </body>
    </html>
  );
}
