import prisma from "@/lib/db";
import axios from "axios";
import { NextRequest } from "next/server";

interface GenerateQuestionsParams {
  gameId: string;
  topic: string;
  amount: number;
  type: "mcq" | "open_ended";
  userId: string;
}

export async function generateQuestionsForGame(
  req: NextRequest,
  { gameId, topic, amount, type }: GenerateQuestionsParams
) {
  try {
    const { data } = await axios.post(
      `${process.env.API_URL as string}/api/quizz/questions`,
      { topic, amount, type },
      {
        withCredentials: true,
        headers: {
          Cookie: req.headers.get("cookie") || "",
        },
      }
    );

    if (type === "mcq") {
      const manyData = data.questions.map((q: any) => {
        const options = [q.option1, q.option2, q.option3, q.answer].sort(
          () => Math.random() - 0.5
        );

        return {
          question: q.question,
          answer: q.answer,
          options: JSON.stringify(options),
          gameId,
          questionType: "mcq",
        };
      });

      await prisma.question.createMany({ data: manyData });

    } else if (type === "open_ended") {
      const openQuestions = data.questions.map((q: any) => ({
        question: q.question,
        answer: q.answer,
        gameId,
        questionType: "open_ended",
      }));

      await prisma.question.createMany({ data: openQuestions });
    }
  } catch (err) {
    console.error(`❌ Error generating questions for game ${gameId}:`, err);
    throw new Error("GENERATION_FAILED");
  }
}
