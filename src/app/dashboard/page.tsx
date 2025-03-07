import PixModal from "@/components/PixModal";
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
    <main className="container mx-auto px-4 py-8 space-y-6">
      <header className="flex items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          <AnimatedTextWord text="Dashboard" />
        </h1>
      </header>

      <section className="grid gap-6 sm:grid-cols-2">
        <QuizMeCard />
        <HistoryCard />
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-2 lg:col-span-2">
          <LearnMore />
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <RecentActivities />
        </div>
      </section>
      <div>
        <PixModal />
      </div>
    </main>
  );
};

export default Dashboard;
