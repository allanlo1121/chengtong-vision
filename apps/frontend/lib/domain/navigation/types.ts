import { LucideIcon } from "lucide-react";

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavMainItem[];
}
