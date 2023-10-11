"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Link,
  button,
} from "@nextui-org/react";
import { Game, Question } from "@prisma/client";
import { ChevronRight, LineChart, Timer } from "lucide-react";
import React from "react";
import { differenceInSeconds } from "date-fns";
import MCQCounter from "./MCQCounter";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { checkAnswerSchema, endGameSchema } from "@/schemas/getQuestionsSchema";
import { toast } from "react-toastify";
import { cn, timeDelta } from "@/lib/utils";

type Props = {
  game: Game & { questions: Pick<Question, "id" | "options" | "question">[] };
};

const MCQ = ({ game }: Props) => {
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [selectedChoice, setSelectedChoice] = React.useState<number>(0);
  const [CorrectAnswer, setCorrectAnswer] = React.useState<number>(0);
  const [WrongAnswer, setWrongAnswer] = React.useState<number>(0);
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

  const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userInput: options[selectedChoice],
      };
      const response = await axios.post("/api/checkAnswer", payload);
      return response.data;
    },
  });

    const { mutate: endGame } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof endGameSchema> = {
        gameId: game.id,
      };
      const response = await axios.post(`/api/endGame`, payload);
      return response.data;
    },
  });

  const handleNext = React.useCallback(() => {
    if (isChecking) return;
    checkAnswer(undefined, {
      onSuccess: ({ isCorrect }) => {
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
          endGame();
          setHasEnded(true);
          return;
        }

        setQuestionIndex((prev) => prev + 1);
      },
    });
  }, [checkAnswer, isChecking, game.questions.length, questionIndex, endGame]);

  const options = React.useMemo(() => {
    return JSON.parse(currentQuestion.options as string) as string[];

    if (!currentQuestion) return [];
  }, [currentQuestion]);

  if (hasEnded) {
    return (
      <div className="absolute flex flex-col items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="px-4 mt-3 font-bold text-white bg-green-500 rounded-md whitespace-nowrap">
          You completed in:{" "}
          {timeDelta(differenceInSeconds(now, game.timeStarted))}
        </div>
        <MCQCounter correctAnswers={CorrectAnswer} wrongAnswers={WrongAnswer} />
        <Link href={"/"} className={cn(button(), "mt-2")}>
          Go black to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 pt-32 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw]">
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
        <MCQCounter correctAnswers={CorrectAnswer} wrongAnswers={WrongAnswer} />
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
            {currentQuestion.question}
          </CardBody>
        </CardHeader>
      </Card>

      <div className="flex flex-col items-center justify-center w-full mt-4">
        {options.map((option, index) => {
          return (
            <Button
              color={selectedChoice === index ? "primary" : "default"}
              variant="ghost"
              onClick={() => setSelectedChoice(index)}
              className="justify-start w-full py-8 mb-4"
              key={index}
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
        disabled={isChecking}
        color="success"
        variant="ghost"
        className="mt-2"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default MCQ;
