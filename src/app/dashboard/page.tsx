import PixModal from "@/components/PixModal";
import AnimatedTextWord from "@/components/ui/AnimatedTextWord";
import Advice from "@/components/dashboard/DevAdvice";
import LearnMore from "@/components/dashboard/LearnMore";
import QuizMeCard from "@/components/dashboard/QuizMeCard";
import RecentActivities from "@/components/dashboard/RecentActivities";
import { loadAdvice } from "@/lib/load-advice";

import { getAuthSession } from "@/lib/nextauth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";


export const metadata: Metadata = {
  title: "Dashboard | Dev.Quizz",
  description: "Dev.Quizz for developers who want to test their knowledge",
};



const Dashboard = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }

  const advice = await loadAdvice();

  return (
    <main className="container mx-auto px-4 py-6 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          <AnimatedTextWord text="Dashboard" />
        </h1>
        <p className="text-muted-foreground mt-2">
          👋Hello, {session.user.name}, welcome to Dev.Quizz! Here {` you'll `}{" "}
          test your knowledge, are you ready for the journey?
        </p>
      </header>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Start Quizz here!</h2>
            <QuizMeCard />
          </section>

          <section>
            <LearnMore />
          </section>
        </div>

        <div className="space-y-8">
          <section>
            <RecentActivities />
          </section>


          <Advice advice={advice} />
        </div>
      </div>

      <PixModal />
    </main>
  );
};

export default Dashboard;
