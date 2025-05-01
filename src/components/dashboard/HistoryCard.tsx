"use client";

import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { Book } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

type Props = {};

const HistoryCard = (props: Props) => {
  const router = useRouter();
  return (
    <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <h2 className="text-2xl font-bold">Your History</h2>
          <Book size={20} strokeWidth={2.5} />
        </CardHeader>
        <Divider />
        <CardBody>
          <Button
            disableRipple
            className="relative overflow-visible rounded-full text-sm hover:-translate-y-1 shadow-xl bg-background/30 after:content-[''] after:absolute after:rounded-full 
          after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 dark:text-white hover:after:opacity-0"
            color="default"
            variant="ghost"
            size="sm"
            onClick={() => {
              router.push("/history");
            }}
          >
            {" "}
            Explore your journey, achievements, and experiences here.
          </Button>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default HistoryCard;
