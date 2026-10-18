import { InteractiveWorld } from "@/components/world/InteractiveWorld";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moolies — The Cozy Interactive NFT Realm",
  description:
    "Explore the illustrated world of Moolies! A collection of 2,000 lovable owl adventurers tokenized on Ethereum with fair launch tokenomics and non-custodial Nesting.",
  keywords: ["Moolies", "NFT", "Interactive NFT", "Ethereum", "Web3", "Generative Art", "Owls"],
  openGraph: {
    title: "Moolies — The Cozy Interactive NFT Realm",
    description:
      "Explore the illustrated world of Moolies! Fly kites, explore the treehouse, and apply for guaranteed whitelist slots at the gate.",
    url: "https://moolies.world",
    siteName: "Moolies NFT",
    images: [
      {
        url: "/moolies-world.png",
        width: 1024,
        height: 650,
        alt: "Moolies Interactive Illustrated Realm",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moolies — Interactive NFT Realm",
    description: "Explore the illustrated world of Moolies! 2,000 owls living across the sunny meadow and lake.",
    images: ["/moolies-world.png"],
    creator: "@moolieshq",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Moolies NFT Collection",
    description: "An interactive, illustrated NFT world featuring 2,000 generative owls on Ethereum.",
    image: "https://moolies.world/moolies-world.png",
    author: {
      "@type": "Organization",
      name: "Moolies Council",
      url: "https://x.com/moolieshq",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">Moolies — The Cozy Interactive NFT Realm</h1>
      <InteractiveWorld />
    </>
  );
}
