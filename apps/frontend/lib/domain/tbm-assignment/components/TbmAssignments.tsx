"use client";

import * as React from "react";
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

import { TunnelPicker } from "@/lib/domain/tunnel/components/tunnel-picker/tunnel-picker";
import type { TunnelPickerItem } from "@/lib/domain/tunnel//types";

import { createTbmAssignmentAction } from "../actions";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tbmId: string;
  tbmName?: string;
};

export function CreateTbmAssignmentDrawer({ open, onOpenChange, tbmId, tbmName }: Props) {
  const router = useRouter();

  const [selectedTunnel, setSelectedTunnel] = useState<TunnelPickerItem | null>(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pending, setPending] = useState(false);

  function resetForm() {
    setSelectedTunnel(null);
    setStartDate("");
    setEndDate("");
  }

  async function handleSubmit() {
    if (!selectedTunnel) {
      toast.error("请选择绑定区间");
      return;
    }

    if (!startDate) {
      toast.error("请选择开始日期");
      return;
    }

    try {
      setPending(true);

      const result = await createTbmAssignmentAction({
        tbmId,
        tunnelId: selectedTunnel.id,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
      });

      if (!result.success) {
        toast.error(result.message ?? "新增绑定失败");
        return;
      }

      toast.success("绑定已新增");

      resetForm();
      onOpenChange(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("新增绑定失败");
    } finally {
      setPending(false);
    }
  }

  function handleClose(open: boolean) {
    onOpenChange(open);

    if (!open) {
      resetForm();
    }
  }

  return (
    <Drawer open={open} onOpenChange={handleClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xl">
          <DrawerHeader>
            <DrawerTitle>新增盾构机-区间绑定</DrawerTitle>
            <DrawerDescription>
              {tbmName ? `当前盾构机：${tbmName}` : "请选择要绑定的区间，并填写开始日期"}
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

              <Input
                type="date"
                value={startDate}
                disabled={pending}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">结束日期</label>

              <Input
                type="date"
                value={endDate}
                disabled={pending}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </div>
          </div>

          <DrawerFooter>
            <Button onClick={handleSubmit} disabled={pending}>
              {pending ? "保存中..." : "保存绑定"}
            </Button>

            <Button
              type="button"
              variant="outline"
              disabled={pending}
              onClick={() => handleClose(false)}
            >
              取消
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
