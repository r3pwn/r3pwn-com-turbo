import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/meta/site-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "r3pwn",
  description: "Description",
  openGraph: {
    title: "r3pwn",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <SiteHeader links={[]} />
        {children}
      </body>
    </html>
  );
}
