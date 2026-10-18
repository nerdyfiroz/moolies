import { z } from "zod";

// Ethereum address regex
const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

export const WhitelistSubmissionSchema = z.object({
  walletAddress: z
    .string()
    .trim()
    .regex(ETH_ADDRESS_REGEX, "Please provide a valid Ethereum wallet address (0x...)"),
  twitterUsername: z
    .string()
    .trim()
    .min(1, "Twitter / X username is required")
    .max(50, "Username too long")
    .transform((val) => (val.startsWith("@") ? val : `@${val}`)),
  discordUsername: z.string().trim().max(50).optional().or(z.literal("")),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .optional()
    .or(z.literal("")),
  reason: z
    .string()
    .trim()
    .min(10, "Please share why you'd like to join Moolies (at least 10 characters)")
    .max(1000, "Reason must not exceed 1000 characters"),
  referralCode: z.string().trim().max(30).optional().or(z.literal("")),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, "You must agree to the Terms of Service and Privacy Policy"),
  // Honeypot field for bot protection
  websiteHoneypot: z.string().optional(),
  submissionTimestamp: z.number().optional(),
});

export type WhitelistSubmissionInput = z.infer<typeof WhitelistSubmissionSchema>;

export const AdminLoginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export const UpdateApplicationStatusSchema = z.object({
  status: z.enum(["pending", "approved", "waitlisted", "rejected"]),
  adminNotes: z.string().max(500).optional(),
});

export const ProjectSettingsSchema = z.object({
  projectName: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(10),
  totalSupply: z.number().positive(),
  mintedSupply: z.number().nonnegative(),
  whitelistPrice: z.string().min(1),
  publicPrice: z.string().min(1),
  currency: z.string().min(1),
  blockchainNetwork: z.string().min(1),
  contractAddress: z.string().trim(),
  explorerUrl: z.string().url(),
  openseaUrl: z.string().url(),
  twitterUrl: z.string().url(),
  discordUrl: z.string().url(),
  mintPhase: z.enum(["upcoming", "whitelist", "public", "soldout", "paused"]),
  isWhitelistOpen: z.boolean(),
  whitelistStartDate: z.string(),
  whitelistEndDate: z.string(),
  publicMintStartDate: z.string(),
  revealDate: z.string(),
});

export const CreateAnnouncementSchema = z.object({
  title: z.string().min(3).max(120),
  content: z.string().min(5).max(2000),
  category: z.enum(["general", "whitelist", "giveaway", "tech", "lore"]).default("general"),
  externalLink: z.string().url().optional().or(z.literal("")),
});

export const CreateProjectEventSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(5).max(500),
  eventDate: z.string(),
  eventType: z.enum(["whitelist", "mint", "reveal", "community", "ama"]),
  isCompleted: z.boolean().default(false),
  order: z.number().default(0),
});
