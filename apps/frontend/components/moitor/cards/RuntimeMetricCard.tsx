"use client";

import Link from "next/link";
import { CalendarDays, CircleDot, HardHat, TrainFrontTunnel } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/core/utils";

interface TunnelOverviewCardProps {
  projectName: string;
  tunnelName: string;
  tbmName?: string | null;
  currentRing?: number | null;
  totalRing?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  href?: string;
  className?: string;
}

export function TunnelOverviewCard({
  projectName,
  tunnelName,
  tbmName,
  currentRing,
  totalRing,
  startDate,
  endDate,
  href,
  className,
}: TunnelOverviewCardProps) {
  const progress =
    typeof currentRing === "number" && typeof totalRing === "number" && totalRing > 0
      ? Math.min(Math.round((currentRing / totalRing) * 100), 100)
      : null;

  const content = (
    <Card
      className={cn(
        "h-full cursor-pointer transition hover:border-primary/50 hover:shadow-md",
        className
      )}
    >
      <CardHeader className="space-y-1 pb-3">
        <div className="text-xs text-muted-foreground">{projectName}</div>

        <CardTitle className="flex items-center gap-2 text-base">
          <TrainFrontTunnel className="h-4 w-4 text-muted-foreground" />
          <span className="truncate">{tunnelName}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <HardHat className="h-4 w-4" />
          <span className="truncate">{tbmName || "暂无盾构机"}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CircleDot className="h-4 w-4" />
              <span>当前环号</span>
            </div>

            <div className="text-sm font-medium">
              <span className="text-2xl font-bold text-foreground">{currentRing ?? "-"}</span>
              <span className="mx-1 text-muted-foreground">/</span>
              <span className="text-muted-foreground">{totalRing ?? "-"}</span>
            </div>
          </div>

          {progress !== null && <Progress value={progress} className="h-2" />}

          {progress !== null && (
            <div className="text-right text-xs text-muted-foreground">完成度 {progress}%</div>
          )}
        </div>

        <div className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2 text-sm">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">工期计划</span>
          <span className="ml-auto font-medium">
            {startDate || "-"} - {endDate || "-"}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  if (!href) return content;

  return (
    <Link href={href} className="block h-full">
      {content}
    </Link>
  );
}
