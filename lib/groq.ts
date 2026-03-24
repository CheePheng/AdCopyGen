import Groq from "groq-sdk";
import { buildSystemPrompt, buildUserPrompt } from "./prompts";
import type { GenerateRequest } from "./types";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

export async function generateCopy(data: GenerateRequest): Promise<string[]> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: buildSystemPrompt(data.language) },
      { role: "user", content: buildUserPrompt(data) },
    ],
    temperature: 0.9,
    response_format: { type: "json_object" },
  });

  const text = completion.choices[0]?.message?.content || "";
  const parsed = JSON.parse(text);

  // Handle both { copies: [...] } and direct [...] formats
  const copies = Array.isArray(parsed) ? parsed : parsed.copies;

  if (!Array.isArray(copies) || !copies.every((item: any) => typeof item === "string")) {
    throw new Error("Invalid response format");
  }

  return copies;
}
