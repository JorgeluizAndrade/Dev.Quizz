import { Card, Divider } from '@nextui-org/react'
import { CheckCircle2, XCircle } from 'lucide-react'
import React from 'react'

type Props = {
    correctAnswers: number
    wrongAnswers: number

}

const MCQCounter = ({correctAnswers, wrongAnswers}: Props) => {
  return (
    <Card className='flex flex-row items-center justify-center p-2'>
        <CheckCircle2 color='green' size={30} />
        <span className='mx-2 text-2xl text-green-600'>{correctAnswers}</span>
        <Divider orientation='vertical' />
        <span className='mx-3 text-2xl text-red-600'>{wrongAnswers}</span>
        <XCircle color='red' size={30}/>
    </Card>
  )
}

export default MCQCounter