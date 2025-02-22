import QuizCreation from '@/components/QuizCreation';
import { getAuthSession } from '@/lib/nextauth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react'




export const metadata: Metadata = {
    title: "Quiz Creator | Dev.Quizz",
    description: "Let's play a quizz with AI, just choose a topic!",
  };

  interface Props {
    searchParams: {
      topic?: string;
    };

  }
const QuizPage =  async ({ searchParams }: Props) => {
    const session = await getAuthSession();
    
    if(!session?.user) {
        return redirect('/')
    }
    
  return (
    <div>
        <QuizCreation topic={searchParams.topic ?? ""}  />
    </div>
  )
}


export default QuizPage