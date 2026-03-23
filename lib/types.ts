export type CopyType =
  | "ad-headlines"
  | "email-subject-lines"
  | "social-media-posts"
  | "product-descriptions"
  | "cta-buttons"
  | "taglines-slogans"
  | "blog-post-titles"
  | "video-script-hooks";

export type Tone =
  | "professional"
  | "casual-friendly"
  | "bold-provocative"
  | "witty-humorous"
  | "luxurious-premium"
  | "urgent-action"
  | "inspirational"
  | "conversational";

export type Framework = "aida" | "pas" | "bab" | "4us";

export type VariationCount = 3 | 5 | 10;

export interface GenerateRequest {
  productName: string;
  description: string;
  targetAudience: string;
  tone: Tone;
  copyType: CopyType;
  keyBenefits?: string;
  competitor?: string;
  charLimit?: number;
  numberOfVariations: VariationCount;
  framework?: Framework;
  language?: "en" | "zh";
}

export interface GenerateResponse {
  copies: string[];
  error?: string;
}

export interface FavoriteItem {
  id: string;
  text: string;
  copyType: CopyType;
  createdAt: number;
}

export const COPY_TYPE_LABELS: Record<CopyType, { label: string; emoji: string; description: string }> = {
  "ad-headlines": { label: "Ad Headlines", emoji: "🔥", description: "Google/Meta Ads" },
  "email-subject-lines": { label: "Email Subject Lines", emoji: "📧", description: "Inbox openers" },
  "social-media-posts": { label: "Social Media Posts", emoji: "📱", description: "Instagram/Twitter/LinkedIn" },
  "product-descriptions": { label: "Product Descriptions", emoji: "📝", description: "E-commerce & landing pages" },
  "cta-buttons": { label: "Call-to-Action", emoji: "🎯", description: "CTA buttons" },
  "taglines-slogans": { label: "Taglines & Slogans", emoji: "💡", description: "Brand messaging" },
  "blog-post-titles": { label: "Blog Post Titles", emoji: "📰", description: "Content marketing" },
  "video-script-hooks": { label: "Video Script Hooks", emoji: "🎬", description: "First 5 seconds" },
};

export const TONE_LABELS: Record<Tone, string> = {
  professional: "Professional",
  "casual-friendly": "Casual & Friendly",
  "bold-provocative": "Bold & Provocative",
  "witty-humorous": "Witty & Humorous",
  "luxurious-premium": "Luxurious & Premium",
  "urgent-action": "Urgent & Action-Oriented",
  inspirational: "Inspirational",
  conversational: "Conversational",
};

export const FRAMEWORK_INFO: Record<Framework, { name: string; description: string }> = {
  aida: { name: "AIDA", description: "Attention → Interest → Desire → Action" },
  pas: { name: "PAS", description: "Problem → Agitate → Solution" },
  bab: { name: "BAB", description: "Before → After → Bridge" },
  "4us": { name: "4 U's", description: "Useful, Urgent, Unique, Ultra-specific" },
};
