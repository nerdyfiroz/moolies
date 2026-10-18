export interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "Minting & Whitelist" | "Utility & DAO";
}

export const FAQ_DATA: FAQItem[] = [
  {
    category: "General",
    question: "What is Moolies?",
    answer:
      "Moolies is an interactive NFT universe centered around 2,000 whimsical, hand-drawn owl characters living across a serene countryside meadow, lake, and treehouse. Each Moolie is a high-resolution vector artwork tokenized on Ethereum.",
  },
  {
    category: "General",
    question: "What is the total supply of Moolies?",
    answer:
      "The collection is strictly capped at 2,000 Moolies. There will never be additional genesis tokens minted.",
  },
  {
    category: "Minting & Whitelist",
    question: "How do I get Whitelisted?",
    answer:
      "Click on 'The Whitelist Gate' right here on the interactive map! Submit your Ethereum wallet address, Twitter/X handle, Discord username, and a short message explaining why you'd like to join our nest. Applications are reviewed manually by our team to prioritize genuine collectors and contributors.",
  },
  {
    category: "Minting & Whitelist",
    question: "What are the mint prices?",
    answer:
      "Whitelist mint price is 0.025 ETH per Moolie (max 2 per wallet). Public mint price is 0.04 ETH per Moolie (max 3 per wallet). Gas fees are minimized through ERC-721A batching.",
  },
  {
    category: "Minting & Whitelist",
    question: "Which blockchain network is used?",
    answer:
      "Moolies is deployed on the Ethereum Mainnet (with Sepolia testnet staging). The contract follows the audited ERC-721A standard.",
  },
  {
    category: "Utility & DAO",
    question: "What utility do Moolie holders receive?",
    answer:
      "Holders enjoy commercial IP rights to their character, governance voting rights in the Nest DAO treasury, non-custodial 'Nesting' rewards, high-resolution source vector files, and priority access to physical merchandise and future storybook lore releases.",
  },
  {
    category: "Utility & DAO",
    question: "What is non-custodial Nesting?",
    answer:
      "Nesting is our staking mechanism that does not require you to transfer your NFT out of your personal wallet. By keeping your Moolie safely nested in your wallet, you accumulate rewards and community multipliers while retaining 100% custody.",
  },
];
