export interface NFTItem {
  tokenId: number;
  name: string;
  description: string;
  image: string;
  rarityTier: "Common" | "Rare" | "Epic" | "Legendary";
  rarityScore: number;
  ownerAddress: string;
  openseaUrl: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}

export const DEMO_NFTS: NFTItem[] = [
  {
    tokenId: 1,
    name: "Moolie #0001 - The Kite Master",
    description: "The Genesis Moolie wearing the iconic purple beanie and flying the legendary Cat Kite over the valley.",
    image: "/moolies-world.png",
    rarityTier: "Legendary",
    rarityScore: 99.4,
    ownerAddress: "0x71C8A1b2F89A4c6c21e0B11eE5E729F4a6C49573",
    openseaUrl: "https://opensea.io/assets/ethereum/0x71C8A1b2F89A4c6c21e0B11eE5E729F4a6C49573/1",
    attributes: [
      { trait_type: "Background", value: "Sunny Meadow" },
      { trait_type: "Feather Color", value: "Cerulean Blue" },
      { trait_type: "Headwear", value: "Purple Knit Beanie" },
      { trait_type: "Outfit", value: "Yellow Rain Jacket" },
      { trait_type: "Accessory", value: "Rainbow Cat Kite" },
      { trait_type: "Eyes", value: "Starry Wonder" },
      { trait_type: "Role", value: "Genesis Artist" },
    ],
  },
  {
    tokenId: 2,
    name: "Moolie #0002 - Sir Archibald",
    description: "Distinguished gentleman owl equipped with golden spectacles and tailored wool tuxedo.",
    image: "/moolies-world.png",
    rarityTier: "Legendary",
    rarityScore: 97.8,
    ownerAddress: "0x12aBc34DeF5678901234567890abcdef12345678",
    openseaUrl: "https://opensea.io/assets/ethereum/0x71C8A1b2F89A4c6c21e0B11eE5E729F4a6C49573/2",
    attributes: [
      { trait_type: "Background", value: "Picnic Grounds" },
      { trait_type: "Feather Color", value: "Dusty Rose" },
      { trait_type: "Headwear", value: "None" },
      { trait_type: "Outfit", value: "Executive Tuxedo & Tie" },
      { trait_type: "Eyewear", value: "Circular Gold Spectacles" },
      { trait_type: "Beak", value: "Yellow Polished" },
      { trait_type: "Role", value: "Founder" },
    ],
  },
  {
    tokenId: 42,
    name: "Moolie #0042 - Boba Barnaby",
    description: "Relaxed owl sipping brown sugar boba tea in his cozy lavender polka-dot hoodie.",
    image: "/moolies-world.png",
    rarityTier: "Epic",
    rarityScore: 88.5,
    ownerAddress: "0x49f3e430d4aB9E5A8bF1B1d654516cD19d6594C1",
    openseaUrl: "https://opensea.io/assets/ethereum/0x71C8A1b2F89A4c6c21e0B11eE5E729F4a6C49573/42",
    attributes: [
      { trait_type: "Background", value: "Wildflowers" },
      { trait_type: "Feather Color", value: "Tawny Brown" },
      { trait_type: "Outfit", value: "Polka-Dot Hoodie" },
      { trait_type: "Drink", value: "Brown Sugar Boba" },
      { trait_type: "Eyes", value: "Charmed" },
      { trait_type: "Companion", value: "White Kitty Blob" },
    ],
  },
  {
    tokenId: 77,
    name: "Moolie #0077 - The Lookout",
    description: "Guarding the treehouse high above the valley with sharp violet feathers and curious eyes.",
    image: "/moolies-world.png",
    rarityTier: "Epic",
    rarityScore: 84.1,
    ownerAddress: "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
    openseaUrl: "https://opensea.io/assets/ethereum/0x71C8A1b2F89A4c6c21e0B11eE5E729F4a6C49573/77",
    attributes: [
      { trait_type: "Background", value: "Treehouse Canopy" },
      { trait_type: "Feather Color", value: "Royal Violet" },
      { trait_type: "Perch", value: "Wooden Balcony" },
      { trait_type: "Surroundings", value: "Orange Blossoms" },
      { trait_type: "Eyes", value: "Big Luminescent" },
    ],
  },
  {
    tokenId: 128,
    name: "Moolie #0128 - Otis Nightshift",
    description: "The hardworking dev owl who dreams in Solidity. Cozy under a quilt with his cyan sleeping mask.",
    image: "/moolies-world.png",
    rarityTier: "Rare",
    rarityScore: 76.3,
    ownerAddress: "0x2e983A1BA5e8bF93425f162486981884B1c901eF",
    openseaUrl: "https://opensea.io/assets/ethereum/0x71C8A1b2F89A4c6c21e0B11eE5E729F4a6C49573/128",
    attributes: [
      { trait_type: "Background", value: "Bedtime Quilt" },
      { trait_type: "Feather Color", value: "Sepia Brown" },
      { trait_type: "Eyewear", value: "Cyan Night Eye Mask" },
      { trait_type: "Bedding", value: "Starry Night Blanket" },
      { trait_type: "Pillow", value: "MOOlies Lore Grimoires" },
    ],
  },
  {
    tokenId: 256,
    name: "Moolie #0256 - Meadow Scout",
    description: "A nimble explorer searching for fluttering monarchs and secret gateways along the lakeside.",
    image: "/moolies-world.png",
    rarityTier: "Rare",
    rarityScore: 71.9,
    ownerAddress: "0x7890aBcD1234567890EfgH1234567890abcdef12",
    openseaUrl: "https://opensea.io/assets/ethereum/0x71C8A1b2F89A4c6c21e0B11eE5E729F4a6C49573/256",
    attributes: [
      { trait_type: "Background", value: "Lakeside Reeds" },
      { trait_type: "Feather Color", value: "Amber Golden" },
      { trait_type: "Outfit", value: "Blue Backpack & Camera" },
      { trait_type: "Creature Friend", value: "Orange Monarch" },
      { trait_type: "Eyes", value: "Curious Spark" },
    ],
  },
  {
    tokenId: 512,
    name: "Moolie #0512 - The Bookworm",
    description: "Keeper of ancient forest chronicles and tokenomic blueprints. Loves relaxing on green picnic turf.",
    image: "/moolies-world.png",
    rarityTier: "Common",
    rarityScore: 54.2,
    ownerAddress: "0x9876543210fedcba9876543210fedcba98765432",
    openseaUrl: "https://opensea.io/assets/ethereum/0x71C8A1b2F89A4c6c21e0B11eE5E729F4a6C49573/512",
    attributes: [
      { trait_type: "Background", value: "Sunlit Clearing" },
      { trait_type: "Feather Color", value: "Hazel Brown" },
      { trait_type: "Item", value: "Golden Cottage Tome" },
      { trait_type: "Flora", value: "White Daisies" },
    ],
  },
  {
    tokenId: 999,
    name: "Moolie #0999 - Lake Dreamer",
    description: "Enjoys quiet mornings gazing across the azure lake while watching kites dance in the wind.",
    image: "/moolies-world.png",
    rarityTier: "Common",
    rarityScore: 51.0,
    ownerAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    openseaUrl: "https://opensea.io/assets/ethereum/0x71C8A1b2F89A4c6c21e0B11eE5E729F4a6C49573/999",
    attributes: [
      { trait_type: "Background", value: "Hills & Horizon" },
      { trait_type: "Feather Color", value: "Cobalt Dusk" },
      { trait_type: "Eyes", value: "Gentle Smile" },
      { trait_type: "Flora", value: "Pink Clover" },
    ],
  },
];
