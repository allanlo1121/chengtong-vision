"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/core/utils";
import { ParameterTemplateNode } from "@/lib/domain/tbm-runtime/types";

import { ParameterTemplateCreateDialog } from "./ParameterTemplateCreateDialog";

interface ParameterTemplateSidebarProps {
  items: ParameterTemplateNode[];
  error?: string;
  selectedId?: number;
}

export function ParameterTemplateSidebar({
  items,
  error,
  selectedId,
}: ParameterTemplateSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setParameterTemplateId = (id?: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (id) {
      params.set("parameterTemplateId", String(id));
    } else {
      params.delete("parameterTemplateId");
    }

    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  return (
    <aside className="w-[280px] shrink-0 border-r bg-muted/30">
      <div className="border-b px-4 py-4">
        <h2 className="text-base font-semibold">TBM</h2>
        <p className="mt-1 text-xs text-muted-foreground">选择TBM</p>
      </div>

      <div className="p-2">
        <ParameterTemplateCreateDialog />
        {error ? (
          <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            加载参数模板失败：{error}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-md border border-dashed px-4 py-10 text-center">
            <p className="text-sm text-muted-foreground">暂无参数模板</p>
            <p className="mt-1 text-xs text-muted-foreground">请先创建参数模板</p>
          </div>
        ) : (
          items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setParameterTemplateId(item.id)}
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
          ))
        )}
      </div>
    </aside>
  );
}
