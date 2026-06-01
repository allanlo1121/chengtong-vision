"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/core/utils";
import { toast } from "sonner";
import type { ParameterGroup } from "@/lib/domain/tbm-runtime/types";

interface Props {
  groups: ParameterGroup[];
  value: string[];
  onChange: (selected: string[]) => void;
  loading?: boolean;
  maxSelected?: number;
}

export function ParameterSelector({
  groups,
  value,
  onChange,
  loading = false,
  maxSelected = 6,
}: Props) {
  const [manualOpenGroups, setManualOpenGroups] = useState<Set<string>>(() => new Set());

  const selectedCodeSet = useMemo(() => new Set(value), [value]);
  const reachedLimit = value.length >= maxSelected;

  const toggle = (code: string, checked: boolean) => {
    if (maxSelected && checked && value.length >= maxSelected) {
      toast.error(`最多只能选择 ${maxSelected} 个参数`);
      return;
    }

    const next = checked
      ? Array.from(new Set([...value, code]))
      : value.filter((item) => item !== code);

    onChange(next);
  };

  const toggleGroupOpen = (subsystemCode: string, open: boolean) => {
    setManualOpenGroups((prev) => {
      const next = new Set(prev);

      if (open) {
        next.add(subsystemCode);
      } else {
        next.delete(subsystemCode);
      }

      return next;
    });
  };

  if (loading) {
    return <div className="p-4 text-sm text-muted-foreground">正在加载参数定义...</div>;
  }

  return (
    <div className="h-full w-full space-y-2 overflow-y-auto rounded-md border p-3">
      <div className="space-y-1 px-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">选择参数列表</h2>

          <span
            className={cn("text-xs", reachedLimit ? "text-orange-500" : "text-muted-foreground")}
          >
            {value.length} / {maxSelected}
          </span>
        </div>

        <p className="text-xs text-muted-foreground">最多可选择 {maxSelected} 个参数</p>
      </div>
      {groups.map((group) => {
        const selectedCount = group.parameters.filter((item) =>
          selectedCodeSet.has(item.parameterCode)
        ).length;

        const hasSelected = selectedCount > 0;

        const isOpen = hasSelected || manualOpenGroups.has(group.subsystemCode);

        return (
          <details
            key={group.subsystemCode}
            open={isOpen}
            onToggle={(event) => {
              const open = event.currentTarget.open;

              // 有选中参数的 group 强制保持展开
              if (hasSelected && !open) return;

              toggleGroupOpen(group.subsystemCode, open);
            }}
            className="rounded-md border p-2"
          >
            <summary className="cursor-pointer select-none font-medium">
              <span>{group.subsystemName}</span>

              {selectedCount > 0 && (
                <span className="ml-2 text-xs text-primary">已选 {selectedCount}</span>
              )}
            </summary>

            <div className="mt-2 space-y-1 pl-4">
              {group.parameters.map((field) => {
                const checked = selectedCodeSet.has(field.parameterCode);
                return (
                  <label
                    key={field.parameterCode}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 text-sm",
                      !checked && reachedLimit && "cursor-not-allowed opacity-50"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={!checked && reachedLimit}
                      onChange={(event) => toggle(field.parameterCode, event.target.checked)}
                    />

                    <span>{field.parameterName}</span>

                    {field.unit && (
                      <span className="text-xs text-muted-foreground">({field.unit})</span>
                    )}
                  </label>
                );
              })}
            </div>
          </details>
        );
      })}
    </div>
  );
}
