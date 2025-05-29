// config/dashboardCardConfig.ts

import { CalendarDays } from "lucide-react";

export interface CardMeta {
  key: keyof ICardProgress;
  subLabel: keyof ICardProgress;
  title: string;
  color: string;
  icon?: React.ReactNode;
}

export const CARD_META: readonly CardMeta[] = [
  {
    key: "ringCountOfDay",
    subLabel: "planCountOfDay",
    title: "今日完成",
    color: "blue",
    icon: CalendarDays, 
    iconColor: "text-blue-500",
  },
  {
    key: "ringCountOfWeek",
    subLabel: "planCountOfWeek",
    title: "本周完成",
    color: "green",
    icon: CalendarDays,
    iconColor: "text-blue-500", 
  },
  {
    key: "ringCountOfMonth",
    subLabel: "planCountOfMonth",
    title: "本月完成",
    color: "purple",
    icon: CalendarDays,
    iconColor: "text-blue-500",
  },
  {
    key: "ringCountOfYear",
    subLabel: "planCountOfYear",
    title: "本年完成",
    color: "yellow",
    icon: CalendarDays,
    iconColor: "text-blue-500",
  },
];

export interface ICardProgress {
  ringCountOfDay: number;
  planCountOfDay: number;
  ringCountOfWeek: number;
  planCountOfWeek: number;
  ringCountOfMonth: number;
  planCountOfMonth: number;
  ringCountOfYear: number;
  planCountOfYear: number;
}

export const EMPTY_CARD_PROGRESS: ICardProgress = {
  ringCountOfDay: 0,
  planCountOfDay: 0,
  ringCountOfWeek: 0,
  planCountOfWeek: 0,
  ringCountOfMonth: 0,
  planCountOfMonth: 0,
  ringCountOfYear: 0,
  planCountOfYear: 0,
};
