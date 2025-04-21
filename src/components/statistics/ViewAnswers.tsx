"use client";

import React from "react";
import { Question } from "@prisma/client";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Tooltip,
} from "@nextui-org/react";
import { CheckCircle, HelpCircle, Info, XCircle, BookOpen, AlertOctagon } from "lucide-react";

type Props = {
  answers: {
    questions: Pick<
      Question,
      "question" | "answer" | "isCorrect" | "userAnswer"
    >[];
  } | null;
};

const ViewAnswers = ({ answers }: Props) => {
  const hasQuestions = answers?.questions?.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">

      <Tooltip content="Review your answers and write them down in a notebook for better preparation for the interview.
       This practice of writing things down makes it easier to remember and absorb knowledge, and can even lead to better results in tests and, of course, in the student's education for the rest of their life.">
        <Button isIconOnly variant="light" aria-label="Information">
        <AlertOctagon 
          color="#0d2dce"
          strokeWidth={4}
          size={24}
          className="text-primary"
        />
        </Button>
      </Tooltip>
        <h2 className="text-2xl font-bold">View Answers</h2>
      </div>


      {!hasQuestions ? (
        <Card>
          <CardBody className="pt-6">
            <p className="text-center text-muted-foreground">
              Answer not found.
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid gap-4">
          {answers.questions.map((question, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="bg-muted/50 pb-3">
                <h2 className="text-base font-medium">
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {index + 1}
                  </span>
                  {question.question}
                </h2>
              </CardHeader>
              <CardBody className="pt-4 space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    User Answer:
                  </p>
                  <p className="pl-4 border-l-2 border-muted-foreground/30">
                    {question.userAnswer ?? "No Answer"}
                  </p>
                </div>

                {question.isCorrect === false && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Correct Answer:
                    </p>
                    <p className="pl-4 border-l-2 border-primary/70">
                      {question.answer}
                    </p>
                  </div>
                )}

                <div className="flex items-center mt-2">
                  <Badge
                    color={
                      question.isCorrect === null
                        ? "default"
                        : question.isCorrect === true
                        ? "primary"
                        : "warning"
                    }
                    className="flex items-center gap-1"
                  >
                    {question.isCorrect === null ? (
                      <>
                        <HelpCircle className="h-4 w-4" />
                        <span>Not rated</span>
                      </>
                    ) : question.isCorrect === true ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        <span>Correct</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4" />
                        <span className="">Wrong</span>
                      </>
                    )}
                  </Badge>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAnswers;
