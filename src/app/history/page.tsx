import HistoryComponent from '@/components/shared/HistoryComponent';
import RecentActivitiesComponents from '@/components/shared/RecentActivitiesComponent';
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
      <div className="container mx-auto flex justify-center items-center min-h-[calc(100vh-16rem)] py-8">
        <div className="w-full max-w-[400px]">
          <RecentActivitiesComponents
            header={"History"}
            text={
              <Link className="text-white bg-gray-700 rounded-md text-lg" href="/dashboard">
                <LayoutDashboard className="mr-1" />
                Back to Dashboard
              </Link>
            }
          >
            <HistoryComponent limit={15} userId={session.user.id} />
          </RecentActivitiesComponents>
        </div>
      </div>
    )
}

export default HistoryPage