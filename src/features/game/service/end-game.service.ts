import prisma from "@/lib/db";
import { endGameSchema } from "@/features/quizz/schemas";

export async function endGame(data: unknown) {
  const { gameId } = endGameSchema.parse(data);

  const game = await prisma.game.findUnique({ where: { id: gameId } });

  if (!game) {
    throw new Error("NOT_FOUND");
  }

  await prisma.game.update({
    where: { id: gameId },
    data: { timeEnded: new Date() },
  });

  return { message: "Game ended" };
}
