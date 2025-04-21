import { NextRequest, NextResponse } from "next/server";
import { endGame } from "@/features/game/service/end-game.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await endGame(body);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return NextResponse.json({ message: "Game not found" }, { status: 404 });
    }

    if (error.name === "ZodError") {
      return NextResponse.json({ message: "Invalid input", details: error.issues }, { status: 400 });
    }

    console.error("❌ Error ending game:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
