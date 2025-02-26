"use client";

import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";
import Link from "next/link";
import React from "react";


type Props = {};

const DevQuizzLogo = (props: Props) => {
  return (
    <div className="p-2 bg-violet-950 rounded-full">
    <BrainCircuit className="w-6 h-6 text-primary-foreground" />
  </div>
  );
};

export default DevQuizzLogo;
