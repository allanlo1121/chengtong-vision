// components/command-center/panel.tsx

import { cn } from "@/lib/core/utils";
import type { LucideIcon } from "lucide-react";

interface PanelProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
  extra?: React.ReactNode;
}

export function Panel({ title, icon: Icon, children, className }: PanelProps) {
  return (
    <section className={cn("rounded-xl border bg-white/20 backdrop-blur-none p-4", className)}>
      <div className="mb-4 flex items-center gap-2 font-semibold">
        {Icon && <Icon className="size-4" />}
        <span>{title}</span>
      </div>

      {children}
    </section>
  );
}
