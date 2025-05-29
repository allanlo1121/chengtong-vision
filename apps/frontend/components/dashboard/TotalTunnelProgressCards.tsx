// components/dashboard/TotalTunnelProgressCards.tsx
"use client";

import { DashCard } from "./DashCard";
import { CARD_META, ICardProgress } from "./config/dashboardCardConfig";

export default function TotalTunnelProgressCards({ cards }: { cards: ICardProgress }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {CARD_META.map((meta, index) => {
        const actual = cards[meta.key] ?? 0;
        const plan = cards[meta.subLabel] ?? 0;
        const percent = plan > 0 ? Math.round((actual / plan) * 100) : 0;
        const isOver = actual >= plan;

        return (
          <DashCard
            key={index}
            title={meta.title}
            value={actual}
            subLabel={`/${plan}`}
            bgColor={`bg-${meta.color}-50`}
            borderColor={`border-${meta.color}-300`}
            icon={meta.icon}
            percentage={percent}
            highlight={!isOver}
          />
        );
      })}
    </div>
  );
}
