"use client";

import { motion } from "framer-motion";

type AdviceProps = {
  advice: string;
};

export default function Advice({ advice }: AdviceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-muted rounded-lg p-4"
    >
      <h2 className="text-xl font-semibold mb-2">😎Developer Advices</h2>
      <p className="text-muted-foreground italic">{advice}</p>
    </motion.div>
  );
}
