"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend, CartesianGrid, AreaChart, Area } from "recharts";
import { useTunnelFilter } from "@/contexts/TunnelFilterProvider";
import { getDayTbmPhases, splitInto10MinSegments, TimeSegment, calculatePhaseDurations } from "@/lib/tbm/query-history/data"
import { convertPhasesToVisItemsWithExtras } from "@/lib/mappers/convertPhasesToVisItemsWithExtras";
import { useRealtimePhases } from "@/hooks";
import { useEffect, useState } from "react";

import PhaseLegend from "./PhaseLegend";
import TimelineVis from "./TimelineVis";
import { analyzePhases } from "@/lib/mappers/analyzePhases";
import { PhaseChart, PieChartWithPaddingAngle } from "./PhaseChart";
import TbmStatsCards from "./TbmStatsCardGroup";







export default function RingEfficiencyChart({ selectedDate }: { selectedDate?: Date }) {

    if (!selectedDate) return <div>请选择日期</div>;
    //console.log("[BigData] 选中的日期:", selectedDate);

    const { filter, tunnels, tunnelIds } = useTunnelFilter();
    console.log("[BigData] 当前隧道过滤器:", filter, "所有隧道:", tunnels, "隧道ID列表:", tunnelIds);

    const tunnelId = filter.tunnelId;

    const { data } = useRealtimePhases(tunnelId, '2025-05-27');

    //console.log("[BigData] 实时阶段数据:", data);


    const day = "2025-05-27";




    const { items: visItems, groups } = convertPhasesToVisItemsWithExtras(data);
    const { phaseDurations, totalSeconds, totalRings, ringRange, } = analyzePhases(data);
    // console.log("[BigData] 可视化项:", phaseDurations, totalSeconds, totalRings, ringRange);




    return (
        <div className="w-full h-full grid grid-rows-10 gap-4 p-4 pb-12 bg-gray-100  rounded-lg shadow-md">

            <div className="w-full row-span-4 grid grid-cols-2 gap-4 overflow-hidden">
                <div className="col-span-1 w-full  border-2 border-gray-300 bg-white p-4">
                    {phaseDurations && phaseDurations.length > 0 ? (<PieChartWithPaddingAngle data={phaseDurations} />) : (
                        <div className="text-center text-gray-500 mt-4">暂无阶段数据</div>
                    )}
                </div>
                <div className="col-span-1 w-full  border-2 border-gray-300 bg-white p-4">
                    <TbmStatsCards distance={0} rings={totalRings} hours={totalSeconds / 3600} />
                </div>
            </div>
            <div className=" w-full row-span-6 bg-white  border-2 border-gray-300 rounded-lg shadow-md p-4 overflow-hidden">
                <h2 className="text-xl font-semibold mb-4">环号时效分析</h2>
                < PhaseLegend />
                {visItems && visItems.length > 0 ? (
                    <TimelineVis items={visItems} groups={groups} day={day} />
                ) : (
                    <div className="text-center text-gray-500 mt-4">暂无时效数据</div>
                )}</div>

        </div>
    );
}

