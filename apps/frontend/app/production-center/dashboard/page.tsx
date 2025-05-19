


import { CardGrid } from "@/components/dashboard/CardGrid"
import RingChartSwitcher from "@/components/dashboard/ring-chart-switcher"
import { DashCardSkeleton } from "@/components/ui/skeleton"
import { fetchDayRingsSum } from "@/lib/data"
import React, { Suspense } from 'react'

export default async function Page() {
  const dayRings = await fetchDayRingsSum(new Date('2025-5-18'))
  //console.log("dayRings", dayRings);


  return (
    <div className="w-full h-full border-2 rounded-2xl border-amber-300">
      <p>Overview</p>
      <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => <DashCardSkeleton key={i} />)}
      </div>}>
        <CardGrid />
      </Suspense>

      <div className="w-full h-96 border-2 rounded-2xl border-green-300">
        <p>Day Rings</p>
        <RingChartSwitcher />
      </div>

    </div>
  )
}
