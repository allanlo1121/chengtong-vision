"use client";

import { format, subHours } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type {
  RuntimeQueryMode,
  RuntimeWorkMode,
  RuntimeQueryLimits,
  RuntimeQueryDraft,
} from "@/lib/domain/tbm-runtime/types";

interface Props {
  limits?: RuntimeQueryLimits;
  selectedParameterNames: string[];
  queryDraft: RuntimeQueryDraft;
  onQueryChange: (newQuery: RuntimeQueryDraft) => void;
  onModeChange: (newMode: RuntimeQueryMode) => void;
  onSearch: () => void;
}

export function RuntimeQueryToolbar({
  limits,
  selectedParameterNames,
  queryDraft,
  onQueryChange,
  onModeChange,
  onSearch,
}: Props) {
  const { mode, workMode, from, to } = queryDraft;

  console.log("RuntimeQueryToolbar render", { queryDraft, limits, selectedParameterNames });

  const error = getRuntimeQueryError(queryDraft, limits);
  const canSearch = selectedParameterNames.length > 0 && !error;

  return (
    <div className="space-y-2 rounded-md border bg-card p-3">
      <div className="flex flex-wrap items-center gap-3">
        {/* 查询模式 */}
        <Select
          value={mode}
          onValueChange={(newMode: RuntimeQueryMode) => {
            onModeChange(newMode);
          }}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="查询方式" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="time">按时间</SelectItem>
            <SelectItem value="ring">按环号</SelectItem>
          </SelectContent>
        </Select>

        {/* 时间区间 */}
        {mode === "time" && (
          <>
            <Input
              type="datetime-local"
              className="w-56"
              value={from ?? format(subHours(new Date(), 12), "yyyy-MM-dd'T'HH:mm")}
              min={limits?.minTime}
              max={limits?.maxTime}
              onChange={(e) => onQueryChange({ ...queryDraft, from: e.target.value })}
            />
            <span className="text-sm text-muted-foreground">至</span>
            <Input
              type="datetime-local"
              className="w-56"
              value={to ?? format(new Date(), "yyyy-MM-dd'T'HH:mm")}
              min={from || limits?.minTime}
              max={limits?.maxTime}
              onChange={(e) => onQueryChange({ ...queryDraft, to: e.target.value })}
            />
          </>
        )}

        {/* 环号区间 */}
        {mode === "ring" && (
          <>
            <Input
              type="number"
              className="w-36"
              value={from ?? ""}
              min={limits?.minRing ?? undefined}
              max={limits?.maxRing ?? undefined}
              onChange={(e) =>
                onQueryChange({
                  ...queryDraft,
                  from: Number(e.target.value),
                })
              }
            />
            <span className="text-sm text-muted-foreground">至</span>
            <Input
              type="number"
              className="w-36"
              value={to ?? ""}
              min={from ?? limits?.minRing ?? undefined}
              max={limits?.maxRing ?? undefined}
              onChange={(e) =>
                onQueryChange({
                  ...queryDraft,
                  to: Number(e.target.value),
                })
              }
            />
          </>
        )}

        {/* 工作模式 */}
        <Select
          value={workMode}
          onValueChange={(newWorkMode: RuntimeWorkMode) =>
            onQueryChange({ ...queryDraft, workMode: newWorkMode })
          }
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="盾构机工作模式" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">工作模式-全部</SelectItem>
            <SelectItem value="advance">工作模式-掘进</SelectItem>
            <SelectItem value="assembly">工作模式-拼装</SelectItem>
            <SelectItem value="shutdown">工作模式-停机</SelectItem>
          </SelectContent>
        </Select>

        {/* 查询按钮 */}
        <Button onClick={onSearch} disabled={!canSearch}>
          查询
        </Button>
      </div>

      {/* 显示参数 */}
      <div className="flex gap-1 flex-wrap max-w-lg">
        {selectedParameterNames.map((name) => (
          <span key={name} className="badge">
            [{name}]
          </span>
        ))}
      </div>

      {error && <div className="text-xs text-destructive">{error}</div>}
    </div>
  );
}

// 校验逻辑不变
function getRuntimeQueryError(
  value: RuntimeQueryDraft,
  limits?: RuntimeQueryLimits
): string | null {
  if (value.mode === "time") {
    if (!value.from || !value.to) return "请选择开始时间和结束时间";
    const fromTime = new Date(value.from).getTime();
    const toTime = new Date(value.to).getTime();
    if (Number.isNaN(fromTime) || Number.isNaN(toTime)) return "时间格式不正确";
    if (toTime <= fromTime) return "结束时间必须大于开始时间";
    const maxRangeMs = 7 * 24 * 60 * 60 * 1000;
    if (toTime - fromTime > maxRangeMs) return "时间范围不能超过 7 天";
    // if (limits?.minTime && fromTime < new Date(limits.minTime).getTime())
    //   return "开始时间不能早于盾构机始发时间";
    // if (limits?.maxTime && toTime > new Date(limits.maxTime).getTime())
    //   return "结束时间不能晚于盾构机允许查询的最大时间";
  }

  if (value.mode === "ring") {
    if (value.from == null || value.to == null) return "请输入起始环号和结束环号";
    const fromR = Number(value.from);
    const toR = Number(value.to);
    if (!Number.isInteger(fromR) || !Number.isInteger(toR)) return "环号必须是整数";
    if (toR < fromR) return "结束环号必须大于或等于起始环号";
    if (limits?.minRing != null && fromR < limits.minRing)
      return `起始环号不能小于 ${limits.minRing}`;
    if (limits?.maxRing != null && toR > limits.maxRing)
      return `结束环号不能大于 ${limits.maxRing}`;
  }

  return null;
}
