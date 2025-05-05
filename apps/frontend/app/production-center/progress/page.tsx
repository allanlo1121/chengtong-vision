import { fetchProgressByTunnelId } from '@/lib/production-center/progress/data'
import ProgressTable from '@/components/production-center/progress/table'
import Progress from '@/components/production-center/progress/progress'
import React from 'react'

export default async function Page() {

    const data = await fetchProgressByTunnelId('5d124de7-75a0-429c-bb28-5136a62316b3')
    console.log(data);
    
  return (
    // <ProgressTable />
    <Progress />
  )
}
