"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Link,
  Tooltip,
  button,
} from "@nextui-org/react";
import { Game, Question } from "@prisma/client";
import { ChevronRight, Timer, RefreshCw } from "lucide-react";
import React from "react";
import { differenceInSeconds } from "date-fns";
import MCQCounter from "./MCQCounter";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { checkAnswerSchemas, endGameSchema } from "@/features/quizz/schemas";
import { toast } from "react-toastify";
import { cn, timeDelta } from "@/lib/utils";

type Props = {
  game: Game & { questions: Pick<Question, "id" | "options" | "question">[] };
};

const MCQ = ({ game }: Props) => {
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [selectedChoice, setSelectedChoice] = React.useState<number>(-1);
  const [correctAnswer, setCorrectAnswer] = React.useState<number>(0);
  const [wrongAnswer, setWrongAnswer] = React.useState<number>(0);
  const [hasEnded, setHasEnded] = React.useState<boolean>(false);
  const [now, setNow] = React.useState<Date>(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!hasEnded) {
        setNow(new Date());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hasEnded]);

  const currentQuestion = React.useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);

  const options = React.useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];

    let rawOptions: string[] = [];

    return Array.isArray(currentQuestion.options)
      ? currentQuestion.options
      : JSON.parse(currentQuestion.options as string);
  }, [currentQuestion]);

  const { mutateAsync: checkAnswer, isLoading: isChecking } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof checkAnswerSchemas> = {
        questionId: currentQuestion.id,
        userInput: options[selectedChoice],
      };
      const response = await axios.post("/api/quizz/checkAnswer", payload);
      return response.data;
    },
  });

  const { mutateAsync: endGame } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof endGameSchema> = {
        gameId: game.id,
      };
      const response = await axios.post(`/api/quizz/endGame`, payload);
      return response.data;
    },
  });

  const handleNext = React.useCallback(async () => {
    if (isChecking) return;
    await checkAnswer(undefined, {
      onSuccess: async ({ isCorrect }) => {
        if (isCorrect) {
          toast.info("🧠 Wow so easy!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setCorrectAnswer((prev) => prev + 1);
        } else {
          toast.error("🙁 Oh no...", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setWrongAnswer((prev) => prev + 1);
        }
        if (questionIndex == game.questions.length - 1) {
          setHasEnded(true);
          await endGame();
          return;
        }
        setSelectedChoice(-1);
        setQuestionIndex((prev) => prev + 1);
      },
    });
  }, [checkAnswer, isChecking, game.questions.length, questionIndex, endGame]);

  if (hasEnded) {
    return (
      <div className="absolute flex flex-col items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Card className="w-full max-w-md">
          <CardBody className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <div className="mb-4 font-semibold text-green-600">
              Time taken:{" "}
              {timeDelta(differenceInSeconds(now, game.timeStarted))}
            </div>
            <MCQCounter
              correctAnswers={correctAnswer}
              wrongAnswers={wrongAnswer}
            />
            <div className="flex justify-center space-x-4 mt-6">
              <Tooltip
                content={
                  <div className="px-1 py-2">
                    <div className="text-small font-bold">Hint</div>
                    <div className="text-tiny">
                      If you want to play again, get your notebook and write
                      down your the mistakes.
                    </div>
                  </div>
                }
              >
                <Button
                  color="primary"
                  variant="solid"
                  onClick={() => window.location.reload()}
                  startContent={<RefreshCw />}
                >
                  Play Again
                </Button>
              </Tooltip>

              <Button color="secondary" variant="bordered" as="a" href="/">
                Back to Dashboard
              </Button>

              <Button
                as="a"
                href="/quiz"
                className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-neutral-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  Another quizz 🧠
                </span>
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <p>
            <span className="text-gray-950 dark:text-gray-300 mr-2">
              Game Topic
            </span>
            <Chip
              variant="shadow"
              classNames={{
                base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                content: "drop-shadow shadow-black text-white",
              }}
            >
              {game.topic}
            </Chip>
          </p>
          <div className="flex self-start mt-3 text-slate-400">
            <Timer className="mr-2" />
            <span>{timeDelta(differenceInSeconds(now, game.timeStarted))}</span>
          </div>
        </div>
        <MCQCounter correctAnswers={correctAnswer} wrongAnswers={wrongAnswer} />
      </div>
      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <h2 className="mr-5 text-center divide-y-small divide-zinc-700/50">
            <div>{questionIndex + 1}</div>
            <div className="text-base text-slate-500">
              {game.questions.length}
            </div>
          </h2>
          <CardBody className="flex-grow text-lg">
            {currentQuestion?.question}
          </CardBody>
        </CardHeader>
      </Card>

      <div className="flex flex-col items-center justify-center w-full mt-4">
        {options.map((option: any, index: number) => {
          return (
            <Button
              color={selectedChoice === index ? "primary" : "default"}
              variant={selectedChoice === index ? "solid" : "bordered"}
              onClick={() => setSelectedChoice(index)}
              disabled={isChecking}
              className="justify-start w-full px-6 py-10 mb-6 text-left whitespace-normal break-words text-lg"
              key={index}
              size="md"
            >
              <div className="flex items-center justify-start ">
                <div className="p-2 px-3 mr-5 border rounded-md">
                  {index + 1}
                </div>
                <div className="text-start">{option}</div>
              </div>
            </Button>
          );
        })}
      </div>
      <Button
        onClick={() => {
          handleNext();
        }}
        isLoading={isChecking}
        disabled={isChecking || selectedChoice === -1}
        color="success"
        variant="ghost"
        className="mt-2"
      >
        {questionIndex === game.questions.length - 1 ? "Finish" : "Next"}
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default MCQ;
