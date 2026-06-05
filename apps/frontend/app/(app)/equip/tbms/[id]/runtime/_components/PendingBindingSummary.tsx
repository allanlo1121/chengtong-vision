"use client";

import { useState, useTransition } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

import type { TbmParameterBindingGroup } from "@/lib/domain/tbm-runtime/types";

interface TemplateOption {
  id: number;
  name: string;
}

interface PendingBindingSummaryProps {
  groups: TbmParameterBindingGroup[];
  values: Record<number, number[]>;
  templateOptions?: TemplateOption[];
  onSubmit: () => void;
  onRemove: (subsystemId: number, parameterId: number) => void;
  onImportTemplate?: (templateId: number) => void;
}

export function PendingBindingSummary({
  groups,
  values,
  templateOptions = [],
  onSubmit,
  onRemove,
  onImportTemplate,
}: PendingBindingSummaryProps) {
  const [pending, startTransition] = useTransition();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");

  const selectedGroups = groups
    .map((group) => {
      const selectedIds = values[group.subsystemId] ?? [];

      return {
        ...group,
        selectedParameters: group.runtimeParameters.filter((item) => selectedIds.includes(item.id)),
      };
    })
    .filter((group) => group.selectedParameters.length > 0);

  const total = selectedGroups.reduce((sum, group) => sum + group.selectedParameters.length, 0);

  const handleImport = () => {
    if (!selectedTemplateId || !onImportTemplate) return;

    const templateId = Number(selectedTemplateId);

    startTransition(() => {
      onImportTemplate(templateId);
    });
  };

  return (
    <div className="flex min-h-0 flex-col rounded-lg border bg-background">
      <div className="shrink-0 border-b p-4">
        <div className="text-sm font-medium">待提交参数总览</div>
        <div className="mt-1 text-xs text-muted-foreground">共选择 {total} 个参数</div>
      </div>

      <div className="flex flex-col shrink-0 items-center justify-between gap-3 border-b p-4">
        <div className="flex min-w-0 items-center gap-2">
          <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="选择已有模板" />
            </SelectTrigger>

            <SelectContent>
              {templateOptions.map((item) => (
                <SelectItem key={item.id} value={String(item.id)}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            type="button"
            variant="secondary"
            onClick={handleImport}
            disabled={!selectedTemplateId || pending || !onImportTemplate}
          >
            初始化选择
          </Button>
        </div>

        <Button size="lg" onClick={onSubmit} disabled={pending || total === 0}>
          {pending ? "保存中..." : `保存全部 ${total} 个参数`}
        </Button>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <Accordion
          type="multiple"
          defaultValue={selectedGroups.map((group) => String(group.subsystemId))}
          className="px-3"
        >
          {selectedGroups.map((group) => (
            <AccordionItem key={group.subsystemId} value={String(group.subsystemId)}>
              <AccordionTrigger className="text-sm">
                {group.subsystemName}
                <span className="ml-2 text-xs text-muted-foreground">
                  {group.selectedParameters.length}
                </span>
              </AccordionTrigger>

              <AccordionContent>
                <div className="space-y-2 pb-2">
                  {group.selectedParameters.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-2 rounded-md border p-2"
                    >
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">
                          {item.code} {item.name}
                        </div>

                        <div className="mt-1 text-xs text-muted-foreground">
                          {[item.dataType, item.unit].filter(Boolean).join(" / ")}
                        </div>
                      </div>

                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 shrink-0"
                        onClick={() => onRemove(group.subsystemId, item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  );
}
