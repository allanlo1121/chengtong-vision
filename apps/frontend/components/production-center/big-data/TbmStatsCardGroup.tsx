import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TbmStatsCards({ distance = 0.00, rings = 0, hours = 0 }: { distance?: number, rings?: number, hours?: number }) {
    const stats = [
        {
            title: "掘进",
            value: `${distance.toFixed(2)} 米`,
        },
        {
            title: "累计拼装",
            value: `${rings} 环`,
        },
        {
            title: "有效施工",
            value: `${hours.toFixed(2)} 小时`,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat) => (
                <Card key={stat.title} className="rounded-2xl shadow-md">
                    <CardHeader>
                        <CardTitle className="text-base text-gray-500">{stat.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
