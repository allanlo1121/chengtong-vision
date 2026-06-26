"use client";

import "./timeline-custom.css";

import { useEffect, useMemo, useRef } from "react";
import { Timeline } from "vis-timeline/standalone";
import { DataSet } from "vis-data";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";

export type PhaseType = "advance" | "assembly" | "stop" | "offline" | "ring";

import { WorkPhaseSegment, RingSegment } from "@/lib/domain/tbm-runtime/types";

interface TimelineVisProps {
  start: string;
  end: string;
  phases: WorkPhaseSegment[];
  rings?: RingSegment[];
  height?: number | string;
}

const PHASE_GROUPS = [
  { id: "ring", content: "环号", order: 1 },
  { id: "advance", content: "掘进", order: 2 },
  { id: "assembly", content: "拼装", order: 3 },
  { id: "stop", content: "停机", order: 4 },
  { id: "offline", content: "掉线", order: 5 },
];

const PHASE_LABEL: Record<PhaseType, string> = {
  ring: "环号",
  advance: "掘进",
  assembly: "拼装",
  stop: "停机",
  offline: "掉线",
};

export default function TimelineVis({
  start,
  end,
  phases,
  rings = [],
  height = 300,
}: TimelineVisProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const items = useMemo(() => {
    const ringItems = rings.map((ring) => ({
      id: `ring-${ring.id}`,
      group: "ring",
      start: new Date(ring.start),
      end: new Date(ring.end),
      content: `${ring.ringNo}环`,
      className: "timeline-ring",
      type: "range",
    }));

    const phaseItems = phases.map((phase) => ({
      id: `phase-${phase.id}`,
      group: phase.type,
      start: new Date(phase.start),
      end: new Date(phase.end),
      content: "",
      title: `${PHASE_LABEL[phase.type]}：${formatTime(phase.start)} - ${formatTime(phase.end)}`,
      className: `timeline-phase timeline-phase-${phase.type}`,
      type: "range",
    }));

    return [...ringItems, ...phaseItems];
  }, [phases, rings]);

  useEffect(() => {
    if (!containerRef.current) return;

    const timeline = new Timeline(
      containerRef.current,
      new DataSet(items),
      new DataSet(PHASE_GROUPS),
      {
        groupOrder: (a: any, b: any) => a.order - b.order,
        editable: false,
        zoomable: false,
        moveable: false,
        height,
        width: "100%",
        margin: {
          item: {
            horizontal: 0,
            vertical: 8,
          },
        },
        start,
        end,
        min: start,
        max: end,
        stack: false,
        stackSubgroups: false,
        showMajorLabels: false,
        orientation: "top",
        format: {
          minorLabels: {
            minute: "HH:mm",
            hour: "HH:mm",
          },
        },
      }
    );

    return () => {
      timeline.destroy();
    };
  }, [items, start, end, height]);

  return <div ref={containerRef} className="w-full border bg-gray-100" />;
}

function formatTime(value: string | Date) {
  return new Date(value).toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
