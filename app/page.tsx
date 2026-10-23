import { MooliesSite } from "@/components/site/MooliesSite";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moolies — PFP NFT Whitelist & Collection",
  description:
    "Official Moolies PFP NFT collection. Strictly capped supply of 2,000 Moolies on Ethereum. Apply for guaranteed whitelist slots and follow @moolieshq.",
  keywords: ["Moolies", "NFT", "PFP", "Whitelist", "Ethereum", "Web3", "moolieshq"],
  openGraph: {
    title: "Moolies — PFP NFT Whitelist & Collection",
    description:
      "Strictly capped supply of 2,000 PFP Moolies on Ethereum. Apply for guaranteed whitelist slots and follow @moolieshq.",
    url: "https://moolies.world",
    siteName: "Moolies NFT",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moolies — PFP NFT Whitelist & Collection",
    description: "Strictly capped supply of 2,000 PFP Moolies on Ethereum. Follow @moolieshq on X.",
    creator: "@moolieshq",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Moolies PFP NFT Collection",
    description: "A PFP NFT collection of 2,000 Moolies on Ethereum.",
    author: {
      "@type": "Organization",
      name: "Moolies",
      url: "https://x.com/moolieshq",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MooliesSite />
    </>
  );
}
