"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  HardHat,
  Cloud,
  Bell,
  TrainTrack,
  Mail,
  LogOut,
  Users,
  House,
  FileText,
} from "lucide-react";

import { DashboardBackground } from "@/components/command-center/DashboardBackground";
import { usePathname } from "next/navigation";

const menus = [
  { key: "dashboard", label: "总览", icon: House, href: "/workspace/command-center/dashboard" },
  { key: "tunnels", label: "区间", icon: TrainTrack, href: "/workspace/command-center/tunnels" },
  { key: "reports", label: "报表", icon: FileText, href: "/workspace/command-center/reports" },
  { key: "attendance", label: "考勤", icon: Users, href: "/workspace/command-center/attendance" },
  { key: "alerts", label: "告警", icon: Bell, href: "/workspace/command-center/alerts" },
  { key: "settings", label: "设置", icon: Cloud, href: "/workspace/command-center/settings" },
];
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // 或者用 usePathname() client component
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <DashboardBackground />
      <header className="relative z-20 flex h-16 items-center justify-between border-b bg-background/80 px-6 backdrop-blur">
        <div className="flex items-center gap-4">
          <HardHat className="size-6 text-primary" />
          <span className="text-lg font-bold"> 城通指挥中心 </span>
        </div>

        <nav className="flex items-center gap-1">
          {menus.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);
            return (
              <Button key={item.key} variant={active ? "default" : "ghost"} className="gap-2">
                <Link href={item.href} className="flex items-center gap-2">
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">{/* 右侧状态 */}</div>
      </header>

      <section className="relative z-10 p-6">{children}</section>
    </main>
  );
}
