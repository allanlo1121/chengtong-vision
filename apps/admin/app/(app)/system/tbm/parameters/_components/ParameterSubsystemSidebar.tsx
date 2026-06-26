"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/core/utils";
import { ParameterSubsystemNode } from "@/lib/domain/tbm-runtime/types";

interface ParameterSubsystemSidebarProps {
  items: ParameterSubsystemNode[];
  selectedId?: number;
}

export function ParameterSubsystemSidebar({ items, selectedId }: ParameterSubsystemSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setSubsystemId = (id?: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (id) {
      params.set("subsystemId", String(id));
    } else {
      params.delete("subsystemId");
    }

    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  return (
    <aside className="w-[280px] shrink-0 border-r bg-muted/30">
      <div className="border-b px-4 py-4">
        <h2 className="text-base font-semibold">参数模块</h2>
        <p className="mt-1 text-xs text-muted-foreground">按子系统筛选运行参数</p>
      </div>

      <div className="p-2">
        <button
          type="button"
          onClick={() => setSubsystemId(undefined)}
          className={cn(
            "mb-1 flex w-full items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted",
            !selectedId && "bg-primary text-primary-foreground hover:bg-primary"
          )}
        >
          <span>全部参数</span>
        </button>

        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSubsystemId(item.id)}
            className={cn(
              "mb-1 flex w-full items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted",
              selectedId === item.id && "bg-primary text-primary-foreground hover:bg-primary"
            )}
          >
            <span className="truncate text-left">
              <span className="font-mono text-xs opacity-70">{item.code}</span> {item.name}
            </span>

            <span className="ml-2 rounded bg-background px-1.5 py-0.5 text-xs text-muted-foreground">
              {item.parameterCount}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
