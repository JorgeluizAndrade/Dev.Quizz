import { NextRequest, NextResponse } from "next/server";
import { checkAnswer } from "@/features/game/service/check-answer.service";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await checkAnswer(body);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    if (error.message === "NOT_FOUND") {
      return NextResponse.json({ error: "Question not found" }, { status: 400 });
    }

    console.error("❌ Error checking answer:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
