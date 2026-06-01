"use client";

import { startTransition, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/core/utils";

import { TransferList } from "@/components/common/transfer-list";

import { replaceTbmParametersAction } from "@/lib/domain/tbm-runtime/actions";
import type {
  ParameterTemplateGroup,
  TbmParameterBindingGroup,
} from "@/lib/domain/tbm-runtime/types";
import { PendingBindingSummary } from "../PendingBindingSummary";

interface TemplateOption {
  id: number;
  name: string;
  groups: {
    subsystemId: number;
    templateParameterIds: number[];
  }[];
}

interface ParameterBindingTabsEditorProps {
  tbmId?: string;
  groups: TbmParameterBindingGroup[];
  templateOptions?: TemplateOption[];
}

export function ParameterBindingTabsEditor({
  tbmId,
  groups,
  templateOptions,
}: ParameterBindingTabsEditorProps) {
  const [values, setValues] = useState<Record<number, number[]>>({});

  const [activeSubsystemId, setActiveSubsystemId] = useState(groups[0]?.subsystemId);

  const activeGroup = groups.find((group) => group.subsystemId === activeSubsystemId) ?? groups[0];
  useEffect(() => {
    setValues(
      Object.fromEntries(groups.map((group) => [group.subsystemId, group.tbmParameterIds]))
    );
  }, [tbmId, groups]);

  console.log("===ParameterBindingTabsEditor===", { tbmId, groups, values });

  const handleImportTemplate = (templateId: number) => {
    const target = templateOptions?.find((item) => item.id === templateId);

    if (!target) {
      toast.error("未找到模板数据");
      return;
    }

    const nextValues = Object.fromEntries(
      groups.map((group) => {
        const templateGroup = target.groups.find((item) => item.subsystemId === group.subsystemId);

        return [group.subsystemId, templateGroup?.templateParameterIds ?? []];
      })
    );

    setValues(nextValues);

    toast.success(`已初始化为「${target.name}」的参数选择`);
  };

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
    <div className="grid min-h-0 flex-1 grid-cols-[180px_minmax(0,1fr)_360px] gap-4">
      {/* 左侧子系统 */}
      <aside className="min-h-0 rounded-lg border bg-card">
        <div className="border-b p-3 text-sm font-medium">子系统</div>

        <div className="min-h-0 overflow-y-auto p-2">
          {groups.map((group) => (
            <button
              key={group.subsystemId}
              type="button"
              onClick={() => setActiveSubsystemId(group.subsystemId)}
              className={cn(
                "mb-1 w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted",
                activeSubsystemId === group.subsystemId &&
                  "bg-primary text-primary-foreground hover:bg-primary"
              )}
            >
              {group.subsystemName}
            </button>
          ))}
        </div>
      </aside>

      {/* 中间 TransferList */}
      <section className="min-h-0">
        <TransferList
          items={activeGroup.runtimeParameters.map((item) => ({
            id: item.id,
            label: `${item.code} ${item.name}`,
            description: [item.dataType, item.unit].filter(Boolean).join(" / "),
            disabled: item.isDisabled,
          }))}
          value={values[activeGroup.subsystemId] ?? []}
          onChange={(nextIds) =>
            setValues((prev) => ({
              ...prev,
              [activeGroup.subsystemId]: nextIds,
            }))
          }
        />
      </section>

      {/* 右侧待提交总览 */}
      <PendingBindingSummary
        groups={groups}
        values={values}
        templateOptions={templateOptions}
        onSubmit={handleSaveAll}
        onRemove={(subsystemId, parameterId) => {
          setValues((prev) => ({
            ...prev,
            [subsystemId]: (prev[subsystemId] ?? []).filter((id) => id !== parameterId),
          }));
        }}
        onImportTemplate={handleImportTemplate}
      />
    </div>
  );
}
