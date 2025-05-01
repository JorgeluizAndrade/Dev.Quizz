import React from "react";
import RecentActivitiesComponents from "../shared/RecentActivitiesComponent";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import HistoryComponent from "../shared/HistoryComponent";
import { ExternalLink } from "lucide-react";

type Props = {};

const RecentActivities = async (props: Props) => {
  const session = await getAuthSession();
  if (!session) {
    redirect("/");
  }
  
  return (
    <RecentActivitiesComponents
      header={"Your Recent Activities"}
      text={"See all History Quizzes"}
    >
      <HistoryComponent limit={2} userId={session.user.id} />
    </RecentActivitiesComponents>
  );
};

export default RecentActivities;
