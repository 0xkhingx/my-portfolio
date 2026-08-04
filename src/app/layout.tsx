import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  // Needed for opengraph-image.tsx to resolve absolutely.
  metadataBase: new URL("https://0xkhingx.vercel.app"),
  title: "0xkhingx — Oluwadamilare | Software Engineer & ML Specialist",
  description:
    "Personal portfolio of Oluwadamilare Ogundele (0xkhingx) — software engineer and ML specialist building minimal, tactile interfaces and the models behind them. Next.js, TypeScript, Python.",
  openGraph: {
    title: "0xkhingx — Software Engineer & ML Specialist",
    description:
      "Machine learning, human touch. Next.js · TypeScript · Python · Framer Motion.",
    type: "website",
    url: "https://0xkhingx.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "0xkhingx — Software Engineer & ML Specialist",
    description:
      "Machine learning, human touch. Next.js · TypeScript · Python · Framer Motion.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={lexend.variable} suppressHydrationWarning>
      <head>
        {/* Applies the stored theme before first paint; falls back to OS preference. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        {/* Bitcount isn't in next/font's registry yet, so it's loaded directly. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Rule targets pages/_document; in the App Router this is site-wide. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bitcount:wght@300..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
