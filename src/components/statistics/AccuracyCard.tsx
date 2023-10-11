"use client"

import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Target } from 'lucide-react';
import React from 'react'

type Props = {
    accuracy: number
}

const AccuracyCard = ({ accuracy }: Props) => {
    accuracy = Math.round(accuracy * 100) / 100;
  return (
    <div>
        <Card className='md:col-span-3'>
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                <h2 className="text-2xl font-bold">Average Accuracy</h2>
                <Target />
            </CardHeader>
            <CardBody>
             <div className="text-sm font-medium">{accuracy.toString() + "%"}</div>
            </CardBody>
        </Card>
    </div>
  )
}

export default AccuracyCard