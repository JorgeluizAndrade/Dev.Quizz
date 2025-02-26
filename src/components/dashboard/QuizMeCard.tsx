"use client"

import { Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import { BrainCog } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { motion } from 'framer-motion'

type Props = {}

const QuizMeCard = (props: Props) => {
    const router  = useRouter();

  
  return (
    <motion.div
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    >
   <Card className=''
   >
    <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
       <h2 className='text-2xl font-bold'>Quizz Me.</h2>
       <BrainCog size={20} strokeWidth={2.5} />
    </CardHeader>
    <Divider />
    <CardBody>
        <Button
          disableRipple
          className="relative overflow-visible rounded-full text-sm hover:-translate-y-1 shadow-xl bg-background/30 after:content-[''] after:absolute after:rounded-full 
          after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 text-black dark:text-white hover:after:opacity-0"
        color='secondary'
        variant='shadow'
        size='sm'
        onClick={()=> {
          router.push('/quiz')
        }}
        > Test your knowledge!</Button>
    </CardBody>
   </Card>
  </motion.div>
  )
}

export default QuizMeCard