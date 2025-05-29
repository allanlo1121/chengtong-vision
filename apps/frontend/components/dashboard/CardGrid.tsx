'use client';

import { useEffect, useState } from "react";
import { DashCard } from "./DashCard";
import { CARD_CONFIG } from "./config/dashboardCardConfig";
import { fetchCardData } from "@/lib/data";
import { useProgressRefresh } from "@/components/production-center/ProgressRefreshProvider";

export function CardGrid() {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const { refreshCount } = useProgressRefresh();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchCardData();
      setStats(data);
      setLoading(false);
    };

    load();
  }, [refreshCount]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {CARD_CONFIG.map((card) => (
        <DashCard
          key={card.key}
          title={card.title}
          value={stats[card.key]}
          type={card.key}
          bgColor={card.bgColor}
          borderColor={card.borderColor}
          
        />
      ))}
    </div>
  );
}
