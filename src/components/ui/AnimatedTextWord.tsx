"use client"

import React from "react";
import { motion } from "framer-motion";
type Props = {
  text: string;

};

const AnimatedTextWord = ({ text }: Props) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className=""
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, idx) => (
        <motion.span variants={child} className="mr-[4px] hyphens-auto" key={idx}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedTextWord;
