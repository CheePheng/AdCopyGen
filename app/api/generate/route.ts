import { NextRequest, NextResponse } from "next/server";
import { generateCopy } from "@/lib/gemini";
import type { GenerateRequest } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateRequest = await req.json();

    // Validate required fields
    if (!body.productName || !body.description || !body.targetAudience || !body.tone || !body.copyType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
      const copies = await generateCopy(body);
      return NextResponse.json({ copies });
    } catch (firstError) {
      // Retry once on failure
      try {
        const copies = await generateCopy(body);
        return NextResponse.json({ copies });
      } catch (retryError: any) {
        if (retryError?.status === 429) {
          return NextResponse.json(
            { error: "You're generating too fast. Wait a moment and try again." },
            { status: 429 }
          );
        }
        return NextResponse.json(
          { error: "Generation failed. Please try again." },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
