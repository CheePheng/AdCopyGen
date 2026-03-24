import type { GenerateRequest } from "./types";
import { COPY_TYPE_LABELS, FRAMEWORK_INFO } from "./types";

export function buildSystemPrompt(language?: "en" | "zh"): string {
  let prompt = `You are an elite marketing copywriter with 20 years of experience at top agencies (Ogilvy, Wieden+Kennedy, Droga5). You specialize in writing copy that converts.

RULES:
1. Every word must earn its place. Cut ruthlessly. No filler.
2. Lead with the benefit to the READER, not features of the product.
3. Use power words that trigger emotion: "free", "instantly", "proven", "secret", "you"
4. Match the requested tone exactly — don't default to generic marketing speak.
5. Use the specified copywriting framework if one is provided.
6. Respect character limits strictly if specified.
7. Each variation must be meaningfully different — vary the angle, hook, structure, or emotional trigger. Do NOT just rephrase the same idea.
8. Never use clichés like "game-changer", "revolutionary", "best-in-class", "unlock your potential" unless the tone specifically calls for hype.
9. For social media: use hooks in the first line, add line breaks for readability.
10. For email subject lines: optimize for open rates — use curiosity gaps, numbers, personalization.
11. For ad headlines: keep them punchy, benefit-driven, and scroll-stopping.`;

  if (language === "zh") {
    prompt += `\n12. IMPORTANT: Generate ALL copy in Chinese (Simplified Chinese / 简体中文). The output must be entirely in Chinese.`;
  }

  prompt += `

OUTPUT FORMAT:
Return ONLY a valid JSON object with a "copies" key containing an array of strings. No markdown, no numbering, no explanations.
Example: {"copies": ["Copy 1 here", "Copy 2 here", "Copy 3 here"]}`;

  return prompt;
}

export function buildUserPrompt(data: GenerateRequest): string {
  const copyTypeLabel = COPY_TYPE_LABELS[data.copyType].label;

  let prompt = `Generate ${data.numberOfVariations} ${copyTypeLabel} variations.\n\n`;
  prompt += `Product: ${data.productName}\n`;
  prompt += `Description: ${data.description}\n`;
  prompt += `Target Audience: ${data.targetAudience}\n`;
  prompt += `Tone: ${data.tone}\n`;

  if (data.keyBenefits) {
    prompt += `Key Benefits: ${data.keyBenefits}\n`;
  }
  if (data.competitor) {
    prompt += `Differentiator: ${data.competitor}\n`;
  }
  if (data.charLimit) {
    prompt += `Character Limit: ${data.charLimit} characters max\n`;
  }
  if (data.framework) {
    prompt += `Use the ${FRAMEWORK_INFO[data.framework].name} (${FRAMEWORK_INFO[data.framework].description}) copywriting framework.\n`;
  }
  if (data.language === "zh") {
    prompt += `Output Language: Chinese (Simplified)\n`;
  }

  return prompt;
}
