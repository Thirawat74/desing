import type { Metadata } from "next";
import Navbar from "./components/navbar";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Xurora Store - หน้าหลัก",
  description: "เว็บไซต์ร้าน Xurora Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#2B0561" />
        <meta name="description" content="เว็บไซต์ร้าน Xurora Store" />
        <meta property="og:title" content="Xurora Store - หน้าหลัก" />
        <meta property="og:description" content="เว็บไซต์ร้าน Xurora Store" />
        <meta property="og:image" content="https://m1r.ai/Svkx.png" />
        <meta name="twitter:card" content="https://m1r.ai/Svkx.png" />
        <link
          href="https://pro.fontawesome.com/releases/v5.15.0/css/all.css"
          rel="stylesheet"
        ></link>
      </head>
      <body>
        <Navbar />
        <div className="transition-all duration-300">
          <Toaster />
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  );
}
