"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type RuntimeQueryMode = "time" | "ring";

export type RuntimeWorkMode = "all" | "advance" | "assembly" | "shutdown";

export interface RuntimeQueryDraft {
  mode: RuntimeQueryMode;
  workMode?: RuntimeWorkMode;
  from: string;
  to: string;
  fromRing: string;
  toRing: string;
}

export interface RuntimeQueryLimits {
  minTime?: string;
  maxTime?: string;
  minRing?: number | null;
  maxRing?: number | null;
}

interface Props {
  value: RuntimeQueryDraft;
  onChange: (next: RuntimeQueryDraft) => void;
  onSearch: () => void;
  disabled?: boolean;
  limits?: RuntimeQueryLimits;
}

const MAX_TIME_RANGE_DAYS = 7;

export function RuntimeQueryToolbar({ value, onChange, onSearch, disabled, limits }: Props) {
  const patch = (partial: Partial<RuntimeQueryDraft>) => {
    onChange({
      ...value,
      ...partial,
    });
  };

  const error = getRuntimeQueryError(value, limits);
  const canSearch = !disabled && !error;

  return (
    <div className="space-y-2 rounded-md border bg-card p-3">
      <div className="flex flex-wrap items-center gap-3">
        <Select value={value.mode} onValueChange={(mode: RuntimeQueryMode) => patch({ mode })}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="查询方式" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="time">按时间</SelectItem>
            <SelectItem value="ring">按环号</SelectItem>
          </SelectContent>
        </Select>

        {value.mode === "time" && (
          <>
            <Input
              type="datetime-local"
              className="w-56"
              value={value.from}
              min={limits?.minTime}
              max={limits?.maxTime}
              onChange={(event) => patch({ from: event.target.value })}
            />

            <span className="text-sm text-muted-foreground">至</span>

            <Input
              type="datetime-local"
              className="w-56"
              value={value.to}
              min={value.from || limits?.minTime}
              max={limits?.maxTime}
              onChange={(event) => patch({ to: event.target.value })}
            />
          </>
        )}

        {value.mode === "ring" && (
          <>
            <Input
              type="number"
              className="w-36"
              placeholder="起始环号"
              value={value.fromRing}
              min={limits?.minRing ?? undefined}
              max={limits?.maxRing ?? undefined}
              onChange={(event) => patch({ fromRing: event.target.value })}
            />

            <span className="text-sm text-muted-foreground">至</span>

            <Input
              type="number"
              className="w-36"
              placeholder="结束环号"
              value={value.toRing}
              min={(value.fromRing || limits?.minRing) ?? undefined}
              max={limits?.maxRing ?? undefined}
              onChange={(event) => patch({ toRing: event.target.value })}
            />
          </>
        )}

        <Select
          value={value.workMode}
          onValueChange={(workMode: RuntimeWorkMode) => patch({ workMode })}
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

        <Button onClick={onSearch} disabled={!canSearch}>
          查询
        </Button>
      </div>

      {error && <div className="text-xs text-destructive">{error}</div>}
    </div>
  );
}

function getRuntimeQueryError(
  value: RuntimeQueryDraft,
  limits?: RuntimeQueryLimits
): string | null {
  if (value.mode === "time") {
    if (!value.from || !value.to) {
      return "请选择开始时间和结束时间";
    }

    const fromTime = new Date(value.from).getTime();
    const toTime = new Date(value.to).getTime();

    if (Number.isNaN(fromTime) || Number.isNaN(toTime)) {
      return "时间格式不正确";
    }

    if (toTime <= fromTime) {
      return "结束时间必须大于开始时间";
    }

    const maxRangeMs = MAX_TIME_RANGE_DAYS * 24 * 60 * 60 * 1000;

    if (toTime - fromTime > maxRangeMs) {
      return `时间范围不能超过 ${MAX_TIME_RANGE_DAYS} 天`;
    }

    if (limits?.minTime) {
      const minTime = new Date(limits.minTime).getTime();

      if (fromTime < minTime) {
        return "开始时间不能早于盾构机始发时间";
      }
    }

    if (limits?.maxTime) {
      const maxTime = new Date(limits.maxTime).getTime();

      if (toTime > maxTime) {
        return "结束时间不能晚于盾构机允许查询的最大时间";
      }
    }
  }

  if (value.mode === "ring") {
    if (!value.fromRing || !value.toRing) {
      return "请输入起始环号和结束环号";
    }

    const fromRing = Number(value.fromRing);
    const toRing = Number(value.toRing);

    if (!Number.isInteger(fromRing) || !Number.isInteger(toRing)) {
      return "环号必须是整数";
    }

    if (toRing < fromRing) {
      return "结束环号必须大于或等于起始环号";
    }

    if (limits?.minRing != null && fromRing < limits.minRing) {
      return `起始环号不能小于 ${limits.minRing}`;
    }

    if (limits?.maxRing != null && toRing > limits.maxRing) {
      return `结束环号不能大于 ${limits.maxRing}`;
    }
  }

  return null;
}
