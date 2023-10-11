import AnimatedTextWord from "@/components/Ui/AnimatedTextWord";
import HistoryCard from "@/components/dashboard/HistoryCard";
import LearnMore from "@/components/dashboard/LearnMore";
import QuizMeCard from "@/components/dashboard/QuizMeCard";
import RecentActivities from "@/components/dashboard/RecentActivities";

import { getAuthSession } from "@/lib/nextauth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export const metadata: Metadata = {
  title: "Dashboard | Dev.Quizz",
  description: "Dev.Quizz for developers who want to test their knowledge",
};

const Dashboard = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }
  return (
    <main className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">
          <AnimatedTextWord text="Dashboard"/>
        </h2>
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <QuizMeCard />
        <HistoryCard />
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2 grid-cols-1">
        <LearnMore />
        <RecentActivities />
      </div>
    </main>
  );
};

export default Dashboard;
