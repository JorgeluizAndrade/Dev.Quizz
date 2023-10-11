"use client"

import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { Trophy } from 'lucide-react'
import React from 'react'

type Props = {accuracy: number}

const ResultsCard = ({ accuracy }: Props) => {
  return (
    <div>
        <Card className='md:col-span-7'>
            <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-7'>
            <h2 className='text-2xl font-bold'>Results</h2>
            <Trophy />
            </CardHeader>
            <CardBody className='flex flex-col items-center justify-center h-3/5'>
                {accuracy > 75  ? (
                        <>
                        <Trophy className="mr-4" stroke="gold" size={50} />
                        <div className="flex flex-col text-2xl font-semibold text-yellow-400">
                        <span className="">Impressive!</span>
                        <span className="text-sm text-center text-black opacity-50">
                            {"> 75% accuracy"}
                        </span>
                        </div>
                        </>
                ) : accuracy > 25 ? (
                    <>
                    <Trophy className="mr-4" stroke="silver" size={50} />
                    <div className="flex flex-col text-2xl font-semibold text-stone-400">
                      <span className="">Good job!</span>
                      <span className="text-sm text-center text-black opacity-50">
                        {"> 25% accuracy"}
                      </span>
                    </div>
                  </>
                ) : (
                    <>
                    <Trophy className="mr-4" stroke="brown" size={50} />
                    <div className="flex flex-col text-2xl font-semibold text-yellow-800">
                      <span className="">Nice try!</span>
                      <span className="text-sm text-center text-black opacity-50">
                        {"< 25% accuracy"}
                      </span>
                    </div>
                  </>
                )}
            </CardBody>
        </Card>
    </div>
  )
}

export default ResultsCard