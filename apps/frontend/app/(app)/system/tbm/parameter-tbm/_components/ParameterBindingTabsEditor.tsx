"use client";

import { startTransition, useEffect, useState } from "react";
import { toast } from "sonner";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { TransferList } from "@/components/common/transfer-list";

import { replaceTbmParametersAction } from "@/lib/domain/tbm-runtime/actions";
import type { TbmParameterBindingGroup } from "@/lib/domain/tbm-runtime/types";
import { PendingBindingSummary } from "./PendingBindingSummary";

interface ParameterBindingTabsEditorProps {
  tbmId?: string;
  groups: TbmParameterBindingGroup[];
}

export function ParameterBindingTabsEditor({ tbmId, groups }: ParameterBindingTabsEditorProps) {
  const [values, setValues] = useState<Record<number, number[]>>({});

  useEffect(() => {
    setValues(
      Object.fromEntries(groups.map((group) => [group.subsystemId, group.tbmParameterIds]))
    );
  }, [tbmId, groups]);

  console.log("===ParameterBindingTabsEditor===", { tbmId, groups, values });

  if (!tbmId) {
    return (
      <div className="flex min-h-0 items-center justify-center text-sm text-muted-foreground">
        请先选择盾构机
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="flex min-h-0 items-center justify-center text-sm text-muted-foreground">
        暂无子系统或参数数据
      </div>
    );
  }

  const defaultTab = String(groups[0].subsystemId);

  //   const totalSelected = Object.values(values).reduce((sum, ids) => sum + ids.length, 0);

  const handleSaveAll = () => {
    startTransition(async () => {
      const payload = Object.entries(values).map(([subsystemId, parameterIds]) => ({
        subsystemId: Number(subsystemId),
        parameterIds,
      }));

      const result = await replaceTbmParametersAction({
        tbmId,
        parameterIds: payload.flatMap((item) => item.parameterIds),
      });

      if (!result.success) {
        toast.error(result.message || "保存失败");
        return;
      }

      toast.success(result.message || "保存成功");
    });
  };

  return (
    <Tabs
      key={tbmId}
      defaultValue={defaultTab}
      className="flex min-h-0 flex-1 flex-col overflow-hidden"
    >
      <div className="h-36 shrink-0 border-b px-6 py-3">
        <TabsList className="flex h-36 flex-wrap justify-start">
          {groups.map((group) => (
            <TabsTrigger key={group.subsystemId} value={String(group.subsystemId)}>
              {group.subsystemName}
            </TabsTrigger>
          ))}
        </TabsList>
        {/* <Button onClick={handleSaveAll} disabled={pending}>
          {pending ? "保存中..." : `保存全部 ${totalSelected} 个参数`}
        </Button> */}
      </div>

      {groups.map((group) => {
        const selectedIds = values[group.subsystemId] ?? [];

        return (
          <TabsContent
            key={group.subsystemId}
            value={String(group.subsystemId)}
            className="m-0  min-h-0 flex-1  overflow-hidden"
          >
            <div className="grid min-h-0 h-full grid-cols-[minmax(0,1fr)_360px] gap-4 p-6">
              <div className="flex min-h-0 flex-col gap-4">
                <div className="shrink-0">
                  <h3 className="text-base font-semibold">{group.subsystemName}</h3>
                  <p className="text-sm text-muted-foreground">
                    当前已选择 {selectedIds.length} 个参数，共 {group.runtimeParameters.length}{" "}
                    个可选参数
                  </p>
                </div>

                <TransferList
                  items={group.runtimeParameters.map((item) => ({
                    id: item.id,
                    label: `${item.code} ${item.name}`,
                    description: [item.dataType, item.unit].filter(Boolean).join(" / "),
                    disabled: item.isDisabled,
                  }))}
                  value={selectedIds}
                  onChange={(nextIds) => {
                    setValues((prev) => ({
                      ...prev,
                      [group.subsystemId]: nextIds,
                    }));
                  }}
                  leftTitle="可选参数"
                  rightTitle="模板参数"
                />
              </div>
              <PendingBindingSummary
                groups={groups}
                values={values}
                onSubmit={handleSaveAll}
                onRemove={(subsystemId, parameterId) => {
                  setValues((prev) => ({
                    ...prev,
                    [subsystemId]: (prev[subsystemId] ?? []).filter((id) => id !== parameterId),
                  }));
                }}
              />
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
