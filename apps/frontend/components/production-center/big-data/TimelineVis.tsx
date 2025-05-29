// components/TimelineVis.tsx
"use client";

import './timeline-custom.css'; // ✅ 自定义样式
import { useEffect, useRef } from "react";
import { DataSet, Timeline } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";

function getTimeRangeForDay(day: string): { start: Date; end: Date } {
    const start = new Date(`${day}T19:00:00+08:00`);
    start.setDate(start.getDate() - 1);
    const end = new Date(`${day}T19:00:00+08:00`);
    return { start, end };
}

export default function TimelineVis({
    items,
    groups,
    day,
}: {
    items: any[];
    groups?: any[];
    day: string;
}) {
    const containerRef = useRef(null);

    useEffect(() => {
        const { start, end } = getTimeRangeForDay(day);

        const timeline = new Timeline(
            containerRef.current!,
            new DataSet(items),
            new DataSet(groups || []), // ✅ 第三个参数传入 groups
            {
                groupOrder: "id",
                editable: false,
                zoomable: false,
                moveable: false,
                height: "100%",
                width: "100%",
                margin: { item: 5 },
                start,
                end,
                min: start,
                max: end,
                stack: false, // 可以保持 true
                stackSubgroups: false, // 👈 禁用子组堆叠
                showMajorLabels: false,
                format: {
                    minorLabels: {
                        minute: "HH:mm",
                        hour: "HH:mm",
                    },
                    majorLabels: {
                        day: "",
                    },
                },
            }
        );

        return () => {
            timeline.destroy();
        };
    }, [items, groups, day]);

    return <div ref={containerRef} className='w-full h-[300px] border-4  bg-gray-200' />;
}
