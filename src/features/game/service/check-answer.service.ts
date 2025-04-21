import prisma from "@/lib/db";
import { checkAnswerSchemas } from "@/features/quizz/schemas";
import { compareTwoStrings } from "string-similarity";

export async function checkAnswer(data: unknown) {
  const { questionId, userInput } = checkAnswerSchemas.parse(data);

  const question = await prisma.question.findUnique({
    where: { id: questionId },
    cacheStrategy: { ttl: 100 },
  });

  if (!question) {
    throw new Error("NOT_FOUND");
  }

  await prisma.question.update({
    where: { id: questionId },
    data: { userAnswer: userInput },
  });

  if (question.questionType === "mcq") {
    const isCorrect = question.answer.trim().toLowerCase() === userInput.trim().toLowerCase();

    await prisma.question.update({
      where: { id: questionId },
      data: { isCorrect },
    });

    return { isCorrect };
  }

  if (question.questionType === "open_ended") {
    let similarity = compareTwoStrings(userInput.trim().toLowerCase(), question.answer.trim().toLowerCase());
    const percentageSimilar = Math.round(similarity * 30);

    await prisma.question.update({
      where: { id: questionId },
      data: { percentageCorrect: percentageSimilar },
    });

    return { percentageSimilar };
  }

  return { message: "Answer processed" };
}
