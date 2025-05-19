
import { DashCard } from "./dash-card";
import { CARD_CONFIG } from "./config/dashboardCards";
import { fetchCardData } from "@/lib/data";

export async function CardGrid() {
    const stats = await fetchCardData();
    console.log("CardGrid stats:", stats);
    

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
