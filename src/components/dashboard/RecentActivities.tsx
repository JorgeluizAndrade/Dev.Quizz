import React from "react";
import RecentActivitiesComponents from "../RecentActivitiesComponent";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import HistoryComponent from "../HistoryComponent";

type Props = {};

const RecentActivities = async (props: Props) => {
    const session = await getAuthSession()
  if(!session){
    redirect("/")
  }
  const game_count = await prisma.game.count({
    where:{
      userId: session.user.id
    }
  })

  return (
    <RecentActivitiesComponents 
    header={"Your Recent Activities"}
    text={`You have played a total of ${game_count} games`}
  >
    <HistoryComponent limit={6} userId={session.user.id} />
  </RecentActivitiesComponents>
  );
};

export default RecentActivities;
