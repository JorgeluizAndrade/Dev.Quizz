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
  const { amount, topic, type, nivelType } = quizCreationSchema.parse(body);

  // await prisma.nivel.createMany({
  //   data: [
  //     { nivelType: 'easy' },
  //     { nivelType: 'intermediary' },
  //     { nivelType: 'hard' },
  //   ],
  //   skipDuplicates: true,
  // });

  const nivel = await prisma.nivel.findFirst({
    where: { nivelType }
  })


  const game = await prisma.game.create({
    data: {
      gameType: type,
      timeStarted: new Date(),
      user: {
        connect: {
          id: session.user.id
        },
      },
      topic,
      nivel: {
        connect: { id: nivel.id }
      }
    },
  });

  await generateQuestionsForGame(req, {
    gameId: game.id,
    topic,
    amount,
    type,
    userId: session.user.id,
    nivel: nivelType
  });

  return game;
}
