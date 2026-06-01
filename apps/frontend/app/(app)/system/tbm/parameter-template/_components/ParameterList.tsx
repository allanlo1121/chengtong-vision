"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

import { TransferList } from "@/components/common/transfer-list";
import { Button } from "@/components/ui/button";
import { TbmRuntimeParameterListItem } from "@/lib/domain/tbm-runtime/types";
import { replaceTemplateParametersBySubsystemAction } from "@/lib/domain/tbm-runtime/actions";

interface ParameterListProps {
  templateId: number;
  subsystemId: number;
  runtimeParameters: TbmRuntimeParameterListItem[];
  templateParameters: TbmRuntimeParameterListItem[];
}

export function ParameterList({
  templateId,
  subsystemId,
  runtimeParameters,
  templateParameters,
}: ParameterListProps) {
  const [pending, startTransition] = useTransition();

  const initialSelectedIds = useMemo(
    () => templateParameters.map((item) => item.id),
    [templateParameters]
  );

  const [selectedIds, setSelectedIds] = useState<number[]>(initialSelectedIds);

  const items = useMemo(
    () =>
      runtimeParameters.map((item) => ({
        id: item.id,
        label: `${item.code} ${item.name}`,
        description: [item.subsystemName, item.dataType, item.unit].filter(Boolean).join(" / "),
        disabled: item.isDisabled,
      })),
    [runtimeParameters]
  );

  const handleSave = () => {
    startTransition(async () => {
      const result = await replaceTemplateParametersBySubsystemAction({
        templateId,
        subsystemId,
        parameterIds: selectedIds,
      });

      if (!result.success) {
        toast.error(result.message || "保存失败");
        return;
      }

      toast.success(result.message || "保存成功");
    });
  };

  if (!templateId) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        请先选择参数模板
      </div>
    );
  }

  if (!subsystemId) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        请先选择子系统
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">模板参数配置</h3>
          <p className="text-sm text-muted-foreground">
            左侧为当前子系统下的可选参数，右侧为当前模板已选择参数。
          </p>
        </div>

        <Button onClick={handleSave} disabled={pending}>
          {pending ? "保存中..." : "保存配置"}
        </Button>
      </div>

      <TransferList
        items={items}
        value={selectedIds}
        onChange={setSelectedIds}
        leftTitle="可选运行参数"
        rightTitle="模板已选参数"
      />
    </div>
  );
}
