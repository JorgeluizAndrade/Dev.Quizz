"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

type Props = {};

const DevQuizzLogo = (props: Props) => {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-950 no-underline left-2 group  cursor-pointer relative inline-block shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white"
      >
        <span className="absolute inset-0 flex  overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
        </span>
        <div className="relative flex space-x-2 items-center z-10 rounded-full py-0.5 px-4 ring-1 ring-white/10 ">
          <span>🧠 Dev.Quizz</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M10.75 8.75L14.25 12L10.75 15.25"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            ></motion.path>
          </svg>
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-purple-700/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
      </motion.div>
    </Link>
  );
};

export default DevQuizzLogo;
