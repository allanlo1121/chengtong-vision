"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/core/utils";

export type TransferItem = {
  id: number;
  label: string;
  description?: string;
  disabled?: boolean;
};

interface TransferListProps {
  items: TransferItem[];
  value: number[];
  onChange: (value: number[]) => void;
  leftTitle?: string;
  rightTitle?: string;
}

export function TransferList({
  items,
  value,
  onChange,
  leftTitle = "可选项",
  rightTitle = "已选项",
}: TransferListProps) {
  const [leftKeyword, setLeftKeyword] = useState("");
  const [rightKeyword, setRightKeyword] = useState("");
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  const selectedSet = useMemo(() => new Set(value), [value]);

  const leftItems = items.filter((item) => !selectedSet.has(item.id));
  const rightItems = items.filter((item) => selectedSet.has(item.id));

  const filteredLeftItems = leftItems.filter((item) =>
    `${item.label} ${item.description ?? ""}`.toLowerCase().includes(leftKeyword.toLowerCase())
  );

  const filteredRightItems = rightItems.filter((item) =>
    `${item.label} ${item.description ?? ""}`.toLowerCase().includes(rightKeyword.toLowerCase())
  );

  const toggleChecked = (id: number) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const moveRight = () => {
    const ids = checkedIds.filter((id) =>
      leftItems.some((item) => item.id === id && !item.disabled)
    );

    onChange([...value, ...ids]);
    setCheckedIds((prev) => prev.filter((id) => !ids.includes(id)));
  };

  const moveLeft = () => {
    const ids = checkedIds.filter((id) => rightItems.some((item) => item.id === id));

    onChange(value.filter((id) => !ids.includes(id)));
    setCheckedIds((prev) => prev.filter((id) => !ids.includes(id)));
  };

  const moveAllRight = () => {
    const ids = leftItems.filter((item) => !item.disabled).map((item) => item.id);

    onChange([...value, ...ids]);
    setCheckedIds([]);
  };

  const moveAllLeft = () => {
    onChange([]);
    setCheckedIds([]);
  };

  return (
    <div className="flex min-h-0 flex-1 gap-3 overflow-hidden">
      <TransferPanel
        title={leftTitle}
        keyword={leftKeyword}
        onKeywordChange={setLeftKeyword}
        items={filteredLeftItems}
        checkedIds={checkedIds}
        onToggle={toggleChecked}
        className="min-h-0 flex-1"
      />

      <div className="flex shrink-0  flex-col items-center justify-center gap-2">
        <Button type="button" size="icon" variant="outline" onClick={moveAllRight}>
          <ChevronsRight className="size-4" />
        </Button>

        <Button type="button" size="icon" variant="outline" onClick={moveRight}>
          <ArrowRight className="size-4" />
        </Button>

        <Button type="button" size="icon" variant="outline" onClick={moveLeft}>
          <ArrowLeft className="size-4" />
        </Button>

        <Button type="button" size="icon" variant="outline" onClick={moveAllLeft}>
          <ChevronsLeft className="size-4" />
        </Button>
      </div>

      <TransferPanel
        title={rightTitle}
        keyword={rightKeyword}
        onKeywordChange={setRightKeyword}
        items={filteredRightItems}
        checkedIds={checkedIds}
        onToggle={toggleChecked}
        className="min-h-0 flex-1"
      />
    </div>
  );
}

interface TransferPanelProps {
  title: string;
  keyword: string;
  onKeywordChange: (value: string) => void;
  items: TransferItem[];
  checkedIds: number[];
  onToggle: (id: number) => void;
  className?: string;
}

function TransferPanel({
  title,
  keyword,
  onKeywordChange,
  items,
  checkedIds,
  onToggle,
  className,
}: TransferPanelProps) {
  return (
    <div className={cn("rounded-md border", className)}>
      <div className="shrink-0 border-b p-3">
        <div className="mb-2 text-sm font-medium">{title}</div>
        <Input
          value={keyword}
          onChange={(event) => onKeywordChange(event.target.value)}
          placeholder="搜索参数..."
        />
      </div>

      <ScrollArea className="h-[600px] min-h-0 flex-1">
        <div className="p-2">
          {items.length === 0 ? (
            <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
              暂无数据
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                role="button"
                aria-disabled={item.disabled}
                onClick={() => !item.disabled && onToggle(item.id)}
                className={cn(
                  "mb-1 flex w-full items-start gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-muted",
                  item.disabled && "cursor-not-allowed opacity-50"
                )}
              >
                <Checkbox
                  checked={checkedIds.includes(item.id)}
                  disabled={item.disabled}
                  onCheckedChange={() => onToggle(item.id)}
                  onClick={(event) => event.stopPropagation()}
                />

                <span className="min-w-0">
                  <span className="block truncate">{item.label}</span>
                  {item.description && (
                    <span className="block truncate text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  )}
                </span>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
