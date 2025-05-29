"use client";
import { DashCard } from "./DashCard";
import {
  Clock,
  CalendarDays,
} from "lucide-react";

interface Tunnel {
  id: string;
  shortName: string;
  status?: string;
}


export default function TunnelCountCards({ tunnels }: { tunnels: Tunnel[] }) {
  console.log("TunnelCountCards", tunnels);
  
  const totalTunnelCount = tunnels.length;
  const completedCount = tunnels.filter(t => t.status === "Completed").length;

  const cardData = [
    {
      title: "隧道总数",
      value: totalTunnelCount,
      icon: Clock,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
    },
    {
      title: "已完隧道",
      value: completedCount,
      icon: CalendarDays,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
    }

  ]

  return (
    <div className="w-1/4 grid grid-cols-2 gap-4">
      {cardData.map((card, index) => (
        <DashCard
          key={index}
          title={card.title}
          value={card.value}
          icon={card.icon}
          bgColor={card.bgColor}
          borderColor={card.borderColor}
        />
      ))}
    </div>
  );
}