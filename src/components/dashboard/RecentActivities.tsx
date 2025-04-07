import React from "react";
import RecentActivitiesComponents from "../RecentActivitiesComponent";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import prisma  from "@/lib/db";
import HistoryComponent from "../HistoryComponent";
import { ExternalLink } from "lucide-react";

type Props = {};

const RecentActivities = async (props: Props) => {
  const session = await getAuthSession();
  if (!session) {
    redirect("/");
  }
  const game_count = await prisma.game.count({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <RecentActivitiesComponents header={"Your Recent Activities"}
    text={"See all History Quizzes"}
    >
      <HistoryComponent limit={8} userId={session.user.id} />
    </RecentActivitiesComponents>
  );
};

export default RecentActivities;
