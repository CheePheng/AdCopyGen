import { NextRequest, NextResponse } from "next/server";
import { generateCopy } from "@/lib/groq";
import type { GenerateRequest } from "@/lib/types";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRateLimitError(err: any): boolean {
  if (err?.status === 429) return true;
  const msg = String(err?.message || "");
  return msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED") || msg.includes("rate limit");
}

export async function POST(req: NextRequest) {
  try {
    const body: GenerateRequest = await req.json();

    if (!body.productName || !body.description || !body.targetAudience || !body.tone || !body.copyType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let lastError: any;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const copies = await generateCopy(body);
        return NextResponse.json({ copies });
      } catch (err: any) {
        lastError = err;
        console.error(`[generate] Attempt ${attempt + 1} failed:`, err?.status, err?.message);
        if (isRateLimitError(err)) {
          // Rate limited — wait 5s, 10s, 15s (aggressive backoff for free tier)
          await delay(5000 * (attempt + 1));
        } else if (attempt < 2) {
          // Other error — brief pause before retry
          await delay(1000);
        }
      }
    }

    // All attempts failed
    if (isRateLimitError(lastError)) {
      return NextResponse.json(
        { error: "You're generating too fast. Wait a moment and try again." },
        { status: 429 }
      );
    }
    return NextResponse.json(
      { error: lastError?.message || "Generation failed. Please try again." },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
