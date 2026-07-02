import type { Metadata } from "next";
import { Figtree, Geist, Geist_Mono } from "next/font/google";

import { cn } from "@/lib/utils";

import "./globals.css";

const figtreeHeading = Figtree({
  subsets: ["latin"],
  variable: "--font-heading",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Simplview | AI Business Intelligence",
  description:
    "Simplview turns plain-English business questions into charts, dashboards, predictions, and executive-ready explanations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full scroll-smooth antialiased",
        geistSans.variable,
        geistMono.variable,
        figtreeHeading.variable
      )}
    >
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
