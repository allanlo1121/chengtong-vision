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

import { updateTbmAssignmentAction } from "../actions";
import { Tbm } from "../../tbm/types";
import { TbmAssignmentListItem } from "../types";
import { TunnelPicker } from "../../tunnel/components/tunnel-picker/tunnel-picker";
import { TunnelPickerItem } from "../../tunnel/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tbmAssignment: TbmAssignmentListItem;
};

export function UpdateTbmAssignmentDrawer({ open, onOpenChange, tbmAssignment }: Props) {
  const router = useRouter();
  const [selectedTunnel, setSelectedTunnel] = useState<TunnelPickerItem | null>(
    tbmAssignment.tunnelId
      ? { id: tbmAssignment.tunnelId, name: tbmAssignment.tunnelName ?? "" }
      : null
  );
  const [startDate, setStartDate] = useState(tbmAssignment?.startDate ?? "");
  const [endDate, setEndDate] = useState(tbmAssignment?.endDate ?? "");
  const [pending, setPending] = useState(false);

  async function handleSubmit() {
    try {
      setPending(true);

      // TODO: 替换成你的 server action
      const result = await updateTbmAssignmentAction({
        id: tbmAssignment.id!,
        tbmId: tbmAssignment.tbmId!,
        tunnelId: selectedTunnel?.id!,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
      });

      if (!result.success) {
        toast.error(result.message ?? "绑定调整失败");
        return;
      }
      toast.success("绑定调整成功");
      onOpenChange(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("绑定调整失败");
    } finally {
      setPending(false);
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xl">
          <DrawerHeader>
            <DrawerTitle>修改绑定区间</DrawerTitle>
            <DrawerDescription>
              {tbmAssignment.tunnelName
                ? `当前隧道：${tbmAssignment.tunnelName}`
                : "修改当前隧道绑定区间"}
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-4 px-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">绑定区间</label>

              <TunnelPicker
                selected={selectedTunnel}
                disabled={pending}
                onChange={setSelectedTunnel}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">开始日期</label>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">结束日期</label>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
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
