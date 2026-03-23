import { NextRequest, NextResponse } from "next/server";
import { generateCopy } from "@/lib/gemini";
import type { GenerateRequest } from "@/lib/types";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
        if (err?.status === 429) {
          // Rate limited — wait longer on each retry
          await delay(2000 * (attempt + 1));
        } else if (attempt < 2) {
          // Other error — brief pause before retry
          await delay(500);
        }
      }
    }

    // All attempts failed
    if (lastError?.status === 429) {
      return NextResponse.json(
        { error: "You're generating too fast. Wait a moment and try again." },
        { status: 429 }
      );
    }
    return NextResponse.json(
      { error: "Generation failed. Please try again." },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
