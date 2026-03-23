import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildSystemPrompt, buildUserPrompt } from "./prompts";
import type { GenerateRequest } from "./types";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

function stripMarkdownBackticks(text: string): string {
  let cleaned = text.trim();
  if (cleaned.startsWith("```json")) cleaned = cleaned.slice(7);
  else if (cleaned.startsWith("```")) cleaned = cleaned.slice(3);
  if (cleaned.endsWith("```")) cleaned = cleaned.slice(0, -3);
  return cleaned.trim();
}

export async function generateCopy(data: GenerateRequest): Promise<string[]> {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: buildSystemPrompt(data.language),
  });

  const userPrompt = buildUserPrompt(data);

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: userPrompt }] }],
    generationConfig: { temperature: 0.9 },
  });

  const text = result.response.text();
  const cleaned = stripMarkdownBackticks(text);
  const parsed = JSON.parse(cleaned);

  if (!Array.isArray(parsed) || !parsed.every((item) => typeof item === "string")) {
    throw new Error("Invalid response format");
  }

  return parsed;
}
