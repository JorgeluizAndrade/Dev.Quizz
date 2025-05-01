"use client";

import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { BrainCog } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

type Props = {};

const QuizMeCard = (props: Props) => {
  const router = useRouter();

  return (
    <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
      <Card fullWidth className="">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <h2 className="text-2xl font-bold">Quizz Me.</h2>
          <BrainCog size={20} strokeWidth={2.5} />
        </CardHeader>
        <Divider />
        <CardBody>
          <Button
            disableRipple
            className="relative overflow-visible rounded-full text-sm shadow-xl 
          bg-blue-600 
          text-white font-medium px-6 py-2
          before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r 
          before:opacity-0 before:transition-opacity 
          before:duration-300 hover:before:opacity-100 before:z-[-1]"
            onClick={() => router.push("/quiz")}
          >
            <motion.span
              className="relative z-10 flex items-center gap-2"
              initial={{ x: -5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Test your knowledge!
            </motion.span>
          </Button>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default QuizMeCard;
