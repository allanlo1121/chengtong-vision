"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { createTunnelScheduleAction } from "../actions";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tunnelId: string;
  tunnelName?: string;
  initialValue?: {
    scheduleStartDate?: string | null;
    scheduleEndDate?: string | null;
    versionNo?: number | null;
    remark?: string | null;
  };
};

export function TunnelScheduleDrawer({
  open,
  onOpenChange,
  tunnelId,
  tunnelName,
  initialValue,
}: Props) {
  const router = useRouter();
  const [scheduleStartDate, setScheduleStartDate] = useState(initialValue?.scheduleStartDate ?? "");
  const [scheduleEndDate, setScheduleEndDate] = useState(initialValue?.scheduleEndDate ?? "");
  const [remark, setRemark] = useState(initialValue?.remark ?? "");
  const [versionNo, setVersionNo] = useState(initialValue?.versionNo ?? null);
  const [pending, setPending] = useState(false);

  async function handleSubmit() {
    try {
      setPending(true);

      // TODO: 替换成你的 server action
      const result = await createTunnelScheduleAction(
        {
          scheduleStartDate,
          scheduleEndDate,
          remark,
          versionNo,
        },
        tunnelId
      );

      if (!result.success) {
        toast.error(result.message ?? "计划日期调整失败");
        return;
      }
      toast.success("计划日期已调整");
      onOpenChange(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("计划日期调整失败");
    } finally {
      setPending(false);
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xl">
          <DrawerHeader>
            <DrawerTitle>修改计划日期</DrawerTitle>
            <DrawerDescription>
              {tunnelName ? `当前隧道：${tunnelName}` : "修改当前隧道计划日期"}
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-4 px-4">
            <input type="hidden" value={tunnelId} />

            <div className="space-y-2">
              <label className="text-sm font-medium">版本号</label>
              <Input
                type="number"
                value={versionNo ?? ""}
                onChange={(e) => setVersionNo(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">计划开始日期</label>
              <Input
                type="date"
                value={scheduleStartDate}
                onChange={(e) => setScheduleStartDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">计划结束日期</label>
              <Input
                type="date"
                value={scheduleEndDate}
                onChange={(e) => setScheduleEndDate(e.target.value)}
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
