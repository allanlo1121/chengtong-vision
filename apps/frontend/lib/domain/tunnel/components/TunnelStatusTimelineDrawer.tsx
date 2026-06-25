"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createTunnelStatusTimelineAction } from "../actions";
import { SelectOption } from "../../tbm/components/data-table-select-filter-header";
import { getOptions } from "@/lib/shared/options/services/option.service";
import { useRouter } from "next/navigation";

type TunnelStatusTimelineValue = {
  id?: string;
  tunnelStatusId?: string | null;
  validFrom?: string | null;
  validTo?: string | null;
  changeType?: string | null;
  remark?: string | null;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tunnelId: string;
  tunnelName?: string;
  initialValue?: TunnelStatusTimelineValue | null;
};

export function TunnelStatusTimelineDrawer({
  open,
  onOpenChange,
  tunnelId,
  tunnelName,
  initialValue,
}: Props) {
  const router = useRouter();
  const {
    tunnelStatusId: initialTunnelStatusId,
    validFrom: initialValidFrom,
    validTo: initialValidTo,
    changeType: initialChangeType,
    remark: initialRemark,
  } = initialValue || {};
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(false);

  const [tunnelStatusId, setTunnelStatusId] = useState(initialTunnelStatusId ?? "");
  const [validFrom, setValidFrom] = useState(initialValidFrom ?? "");
  const [validTo, setValidTo] = useState(initialValidTo ?? "");
  const [changeType, setChangeType] = useState(initialChangeType ?? "manual");
  const [remark, setRemark] = useState(initialRemark ?? "");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (options.length > 0) return;

    async function loadOptions() {
      try {
        setLoadingOptions(true);

        const rows = await getOptions({ source: "master", code: "PROJECT_SUB_STATUS" });

        setOptions(rows);
      } catch (error) {
        console.error(error);
        toast.error("加载施工状态选项失败");
      } finally {
        setLoadingOptions(false);
      }
    }

    loadOptions();
  }, [open, options.length]);

  async function handleSubmit() {
    try {
      setPending(true);

      // TODO: 替换成你的 server action
      const result = await createTunnelStatusTimelineAction(
        {
          tunnelStatusId,
          validFrom,
          validTo,
          changeType,
          remark,
        },
        tunnelId
      );

      if (!result.success) {
        toast.error(result.message ?? "施工状态更新失败");
        return;
      }
      toast.success("施工状态已更新");
      onOpenChange(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("施工状态更新失败");
    } finally {
      setPending(false);
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xl">
          <DrawerHeader>
            <DrawerTitle>修改施工状态</DrawerTitle>
            <DrawerDescription>
              {tunnelName ? `当前隧道：${tunnelName}` : "修改当前隧道施工状态"}
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-4 px-4">
            <input type="hidden" value={tunnelId} />

            <Select
              value={tunnelStatusId}
              onValueChange={setTunnelStatusId}
              disabled={loadingOptions}
            >
              <SelectTrigger>
                <SelectValue placeholder={loadingOptions ? "加载中..." : "选择施工状态"} />
              </SelectTrigger>

              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="space-y-2">
              <label className="text-sm font-medium">开始日期</label>
              <Input type="date" value={validFrom} onChange={(e) => setValidFrom(e.target.value)} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">结束日期</label>
              <Input type="date" value={validTo} onChange={(e) => setValidTo(e.target.value)} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">变更类型</label>
              <Input
                placeholder="例如：manual / automatic"
                value={changeType}
                onChange={(e) => setChangeType(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">备注</label>
              <Input
                placeholder="可选"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
              />
            </div>
          </div>

          <DrawerFooter>
            <Button onClick={handleSubmit} disabled={pending}>
              {pending ? "保存中..." : "保存"}
            </Button>

            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
