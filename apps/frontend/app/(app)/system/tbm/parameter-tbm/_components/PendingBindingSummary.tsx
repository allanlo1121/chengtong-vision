import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useTransition } from "react";

type PendingBindingSummaryProps = {
  groups: {
    subsystemId: number;
    subsystemName: string;
    runtimeParameters: {
      id: number;
      code: string;
      name: string;
      dataType: string;
      unit?: string | null;
    }[];
  }[];
  values: Record<number, number[]>;
  onSubmit: () => void;
  onRemove: (subsystemId: number, parameterId: number) => void;
};

export function PendingBindingSummary({
  groups,
  values,
  onSubmit,
  onRemove,
}: PendingBindingSummaryProps) {
  const selectedGroups = groups
    .map((group) => {
      const selectedIds = values[group.subsystemId] ?? [];

      return {
        ...group,
        selectedParameters: group.runtimeParameters.filter((item) => selectedIds.includes(item.id)),
      };
    })
    .filter((group) => group.selectedParameters.length > 0);

  const [pending] = useTransition();

  const total = selectedGroups.reduce((sum, group) => sum + group.selectedParameters.length, 0);

  return (
    <div className="flex min-h-0 flex-col rounded-lg border bg-background">
      <div className="shrink-0 border-b p-4">
        <div className="text-sm font-medium">待提交参数总览</div>
        <div className="mt-1 text-xs text-muted-foreground">共选择 {total} 个参数</div>
      </div>
      <div className="flex items-center justify-end gap-2 mx-auto border-b p-4">
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
