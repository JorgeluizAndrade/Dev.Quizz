import QuizCreation from '@/components/QuizCreation';
import { getAuthSession } from '@/lib/nextauth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

export const metadata: Metadata = {
    title: "Quiz | Dev.Quizz",
    description: "Dev.Quizz for developers who want to test their knowledge",
  };

const QuizPage =  async (props: Props) => {
    const session = await getAuthSession();
    
    if(!session?.user) {
        return redirect('/')
    }
  return (
    <div>
        <QuizCreation topic='golang' />
    </div>
  )
}

export default QuizPage