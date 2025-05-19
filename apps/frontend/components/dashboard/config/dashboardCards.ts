
import { RefreshCcw, CheckCircle, PieChart, BarChart2 } from "lucide-react";

export const iconMap = {
    tunnelCount: RefreshCcw,
    completedTunnelCount: CheckCircle,
    ringCountOfWeek: BarChart2,
    ringCountOfMonth: BarChart2,
    ringCountOfYear: PieChart,
};

export type StatKey = keyof typeof iconMap; // 保证类型安全

export interface DashCardConfig {
    key: StatKey;
    title: string;
    bgColor: string;
    borderColor: string;
}

export const CARD_CONFIG: DashCardConfig[] = [
    {
        key: "tunnelCount",
        title: "在建隧道数",
        bgColor: "bg-blue-100",
        borderColor: "border-blue-400",

    },
    {
        key: "completedTunnelCount",
        title: "本年完工隧道",
        bgColor: "bg-green-100",
        borderColor: "border-green-400",

    },
    {
        key: "ringCountOfWeek",
        title: "本周完成环数",
        bgColor: "bg-orange-100",
        borderColor: "border-orange-400",

    },
    {
        key: "ringCountOfMonth",
        title: "本月完成环数",
        bgColor: "bg-yellow-100",
        borderColor: "border-yellow-400",

    },
    {
        key: "ringCountOfYear",
        title: "本年完成环数",
        bgColor: "bg-purple-100",
        borderColor: "border-purple-400",

    },
];
