import prisma from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { quizCreationSchema } from "@/features/quizz/schemas";
import { generateQuestionsForGame } from "./generate-questions-for-game";
import { NextRequest } from "next/server";

export async function createGame(req: NextRequest) {
  const session = await getAuthSession();
  if (!session?.user) {
    throw new Error("UNAUTHORIZED");
  }

  const body = await req.json();
  const { amount, topic, type } = quizCreationSchema.parse(body);


  const game = await prisma.game.create({
    data: {
      gameType: type,
      timeStarted: new Date(),
      userId: session.user.id,
      topic,
    },
  });

  await generateQuestionsForGame(req, {
    gameId: game.id,
    topic,
    amount,
    type,
    userId: session.user.id,
  });

  return game;
}
