"use client";

import { cn } from "@/lib/core/utils";
import type { TbmPickerItem } from "@/lib/domain/tbm/types";

interface TbmSidebarListProps {
  tbms: TbmPickerItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function TbmSidebarList({ tbms, selectedId, onSelect }: TbmSidebarListProps) {
  if (tbms.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
        暂无盾构机
      </div>
    );
  }

  return (
    <div className="p-2">
      {tbms.map((tbm) => (
        <button
          key={tbm.id}
          type="button"
          onClick={() => onSelect(String(tbm.id))}
          className={cn(
            "mb-1 w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted",
            selectedId === String(tbm.id) && "bg-primary text-primary-foreground hover:bg-primary"
          )}
        >
          <div className="font-medium">{tbm.name}</div>

          <div className="mt-1 text-xs opacity-80">
            {tbm.tbmTypeName ?? "未知类型"} · {tbm.manufacturerName ?? "未知厂家"}
          </div>

          {tbm.diameter != null && (
            <div className="mt-1 text-xs opacity-70">直径：{tbm.diameter} m</div>
          )}
        </button>
      ))}
    </div>
  );
}
