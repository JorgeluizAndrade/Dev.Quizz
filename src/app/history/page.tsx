import HistoryComponent from '@/components/HistoryComponent';
import RecentActivitiesComponents from '@/components/RecentActivitiesComponent';
import { getAuthSession } from '@/lib/nextauth'
import { LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import React from 'react'


type Props = {}

const HistoryPage = async (props: Props) => {
    const session =  await getAuthSession();
    if(!session){
        redirect('/')
    }
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[400px]">
      <RecentActivitiesComponents 
    header={"History"}
    text={
        <Link className='text-white bg-gray-700 rounded-md  text-lg ' href="/dashboard">
        <LayoutDashboard className="mr-1" />
        Back to Dashboard
      </Link>
    }
  >
    <HistoryComponent limit={15} userId={session.user.id} />
  </RecentActivitiesComponents>
    </div>
  )
}

export default HistoryPage