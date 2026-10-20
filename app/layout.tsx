import type { Metadata } from "next";
import { Geist, Geist_Mono, Fredoka } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const cooperBlack = localFont({
  src: "../public/fonts/CooperBlack.woff2",
  variable: "--font-cooper-black",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Moolies — The Cozy Interactive NFT Realm",
  description: "Explore the illustrated world of Moolies! 2,000 lovable owl adventurers on Ethereum.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cooperBlack.variable} ${geistSans.variable} ${geistMono.variable} ${fredoka.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#5fc2ea] text-slate-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
