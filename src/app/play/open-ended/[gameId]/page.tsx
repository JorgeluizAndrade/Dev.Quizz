import OpenEnded from "@/components/OpenEnded";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";
import type { Metadata } from "next";


type Props = {
  params: {
    gameId: string;
  };
}


export const metadata: Metadata = {
  title: "Open ended Game | Dev.Quizz"
};

const OpenEndedPage = async ({ params: { gameId } }: Props) => {
  const session =  await getAuthSession();
  if(!session){
    redirect('/')
  }

  const game = await prisma.game.findUnique({
    where: {
      id:gameId,
    },
    include: {
      questions:{
        select: {
          id:true,
          question:true,
          answer: true, 
        }
      }
    }
  })

  if (!game || game.gameType === "mcq") {
    return redirect("/quiz");
  }
  return <OpenEnded game={game} />
    
  
}

export default OpenEndedPage