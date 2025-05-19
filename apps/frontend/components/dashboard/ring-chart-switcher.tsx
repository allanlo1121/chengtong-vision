"use client";
import { useState, useEffect } from "react";
//import { getDailyProgressChartData, getWeeklyProgressChartData, getMonthlyProgressChartData } from "./utils";
import RingChart from "./ring-chart";

export default function RingOver() {
    const [mode, setMode] = useState<"day" | "week" | "month">("day");
    const [data, setData] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                let result = [];
                // if (mode === "day") result = await getDailyProgressChartData();
                // if (mode === "week") result = await getWeeklyProgressChartData();
                // if (mode === "month") result = await getMonthlyProgressChartData();
                setData(result);
            } catch (e) {
                console.error("获取进度失败", e);
            }
        };

        load();
    }, [mode]);

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                {["day", "week", "month"].map((m) => (
                    <button
                        key={m}
                        onClick={() => setMode(m as "day" | "week" | "month")}
                        className={`px-4 py-1 rounded ${mode === m ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                            }`}
                    >
                        {m === "day" ? "每日" : m === "week" ? "每周" : "每月"}
                    </button>
                ))}
            </div>

            <RingChart data={data} />
        </div>
    );
}
