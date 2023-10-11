"use client"

import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Hourglass } from 'lucide-react';
import { timeDelta } from '@/lib/utils';

import React from 'react'
import { differenceInSeconds } from 'date-fns';

type Props = {
    timeEnded: Date;
    timeStarted: Date;
  };

const TimeTakenCard = ({ timeEnded, timeStarted }: Props) => {
  return (
    <div>
        <Card className='md:col-span-4'>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <h2 className='text-2xl font-bold'>Time Taken</h2>
                <Hourglass />
            </CardHeader>
            <CardBody>
            <div className="text-sm font-medium">
          {timeDelta(differenceInSeconds(timeEnded, timeStarted))}
        </div>
            </CardBody>
        </Card>
    </div>
  )
}

export default TimeTakenCard