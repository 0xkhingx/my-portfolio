import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  title: "0xkhingx — Oluwadamilare | Frontend Developer",
  description:
    "Personal portfolio of Oluwadamilare (0xkhingx) — frontend developer building minimal, tactile, character-driven interfaces with Next.js, TypeScript, and Framer Motion.",
  openGraph: {
    title: "0xkhingx — Frontend Developer",
    description:
      "Minimal, tactile, character-driven web interfaces. Next.js · TypeScript · Framer Motion.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={lexend.variable}>
      <head>
        {/* Bitcount isn't in next/font's registry yet, so it's loaded directly. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bitcount:wght@300..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
