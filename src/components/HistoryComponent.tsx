import { prisma } from "@/lib/db";
import { Card, CardBody } from "@nextui-org/react";
import { Badge, BarChart2, BookOpen, Calendar, Clock, CopyCheck, Trophy } from "lucide-react";
import Link from "next/link";
import React from "react";
import { formatDistanceToNow } from "date-fns"


type Props = {
  limit: number;
  userId: string;
};

const HistoryComponent = async ({ limit, userId }: Props) => {
  const games = await prisma.game.findMany({
    where: {
      userId,
    },
    take: limit,
    orderBy: {
      timeStarted: "desc",
    },
  });

  const totalGames = games.length
  const mcqGames = games.filter((game) => game.gameType === "mcq").length
  const openEndedGames = games.filter((game) => game.gameType === "open_ended").length

  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <Trophy className="w-12 h-12 text-yellow-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Quiz History Yet</h3>
        <p className="text-gray-500 mb-4">Complete your first quiz to see your history here!</p>
        <Link href="/quiz" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Start a Quiz
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Quizzes</p>
              <p className="text-2xl font-bold">{totalGames}</p>
            </div>
            <BarChart2 className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Multiple Choice</p>
              <p className="text-2xl font-bold">{mcqGames}</p>
            </div>
            <CopyCheck className="h-8 w-8 text-indigo-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Open-Ended</p>
              <p className="text-2xl font-bold">{openEndedGames}</p>
            </div>
            <BookOpen className="h-8 w-8 text-emerald-500" />
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Calendar className="mr-2 h-5 w-5" />
        Recent Quiz History
      </h2>

      <div className="space-y-4">
        {games.map((game) => {
          const isCompleted = !!game.timeEnded
          const gameDate = new Date(game.timeStarted)
          const timeAgo = formatDistanceToNow(gameDate, { addSuffix: true })

          return (
            <div
              key={game.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all hover:shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4">
                <div className="flex items-start sm:items-center mb-3 sm:mb-0">
                  <div
                    className={`p-2 rounded-full mr-3 ${
                      game.gameType === "mcq" ? "bg-indigo-100 text-indigo-700" : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {game.gameType === "mcq" ? <CopyCheck className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
                  </div>
                  <div className="space-y-1">
                    <Link
                      href={`statistics/${game.id}`}
                      className="text-base font-medium hover:underline inline-flex items-center"
                    >
                      {game.topic}
                      {isCompleted && <Trophy className="w-4 h-4 ml-2 text-yellow-500" />}
                    </Link>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          game.gameType === "mcq"
                            ? "bg-indigo-100 text-indigo-800"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {game.gameType === "mcq" ? "Multiple Choice" : "Open-Ended"}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {timeAgo}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Link
                    href={`statistics/${game.id}`}
                    className="text-sm px-3 py-1 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}



export default HistoryComponent;
