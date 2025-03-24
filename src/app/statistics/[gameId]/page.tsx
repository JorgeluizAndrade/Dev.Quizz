import AccuracyCard from "@/components/statistics/AccuracyCard";
import ResultsCard from "@/components/statistics/ResultsCard";
import TimeTakenCard from "@/components/statistics/TimeTakenCard";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import type { Metadata } from "next";
import WrongAnswer from "@/components/ViewAnswers";

type Props = {
  params: {
    gameId: string;
  };
};

export const metadata: Metadata = {
  title: "Statistic | Dev.Quizz",
  description: "See my statistic in game",
};

const StatisticsPage = async ({ params: { gameId } }: Props) => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/");
  }

  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: {
      questions: true,
    },
  });
  if (!game) {
    redirect("/");
  }

  const wrongsAnswer = await prisma.game.findUnique({
    where: { id: gameId },
    select: {
      questions: {
        select: { question: true, answer:true ,isCorrect: true, userAnswer: true },
      },
    },
  });

  let accuracy: number = 0;

  if (game.gameType === "mcq") {
    let totalCorrect = game.questions.reduce((acc: number, question) => {
      if (question.isCorrect) {
        return acc + 1;
      }
      return acc;
    }, 0);
    accuracy = totalCorrect / game.questions.length;
  }
  accuracy = Math.round(accuracy * 100) / 100;

  return (
    <>
      <div className="p-8 mx-auto max-w-7xl">
        <div className="flex justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter">Summary</h2>
          <div className="flex items-center space-x-2 ">
            <Link
              className="text-white bg-gray-700 rounded-md p-2 text-lg "
              href="/dashboard"
            >
              Back to dashboard
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <ResultsCard accuracy={accuracy} />
            <AccuracyCard accuracy={accuracy} />
            <TimeTakenCard
              timeEnded={new Date(game.timeEnded ?? 0)}
              timeStarted={new Date(game.timeStarted ?? 0)}
            />
          </div>
        </div>
        <div>
          <div className="space-y-4">
          <WrongAnswer wrongsAnswer={wrongsAnswer} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticsPage;
