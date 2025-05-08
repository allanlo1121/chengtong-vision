"use client";

import { useActionState, useTransition } from "react";
import { updateTunnelProgressDataAction } from "@/lib/project/progress/actions";
import { ITunnelProgressData } from "@/lib/project/progress/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export function ProgressEditDialog({
  progress,
}: {
  progress: ITunnelProgressData;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition(); // ⏳
  const [state, formAction] = useActionState(updateTunnelProgressDataAction, {
    success: false,
  });

  // ✅ 成功处理：关闭、提示、刷新
  useEffect(() => {
    if (state.success) {
      toast.success("进度更新成功 ✅");
      setOpen(false);
      startTransition(() => router.refresh());
    }
  }, [state.success]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">编辑</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>编辑进度</DialogTitle>
          <DialogDescription>请填写进度信息</DialogDescription>
        </DialogHeader>
        <form
          action={(formData) => {
            startTransition(() => formAction(formData));
          }}
          className="space-y-4"
        >
          <input type="hidden" name="id" value={progress.id} />
          <div className="grid grid-cols-3 w-full max-w-sm items-center gap-1.5">
            <Label
              htmlFor="plan_ring_count"
              className="col-span-1 text-sm font-medium"
            >
              计划环数
            </Label>
            <Input
              name="plan_ring_count"
              type="number"
              min="0"
              defaultValue={progress.plan_ring_count ?? "0"}
              placeholder="计划环数"
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-3 w-full max-w-sm items-center gap-1.5">
            <Label
              htmlFor="plan_ring_count"
              className="col-span-1 text-sm font-medium"
            >
              开始环号
            </Label>
            <Input
              name="ring_start"
              type="number"
              defaultValue={progress.ring_start ?? "0"}
              placeholder="开始环号"
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-3 w-full max-w-sm items-center gap-1">
            <Label
              htmlFor="plan_ring_count"
              className="col-span-1 text-sm font-medium"
            >
              结束环号
            </Label>
            <Input
              name="ring_end"
              type="number"
              defaultValue={progress.ring_end ?? ""}
              placeholder="结束环号"
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-3 w-full max-w-sm items-center gap-1.5">
            <Label
              htmlFor="plan_ring_count"
              className="col-span-1 text-sm font-medium"
            >
              开始里程
            </Label>
            <Input
              name="op_num_start"
              type="number"
              step="0.001"
              defaultValue={progress.op_num_start ?? ""}
              placeholder="开始里程"
            />
          </div>
          <div className="grid grid-cols-3 w-full max-w-sm items-center gap-1.5">
            <Label
              htmlFor="plan_ring_count"
              className="col-span-1 text-sm font-medium"
            >
              结束里程
            </Label>
            <Input
              name="op_num_end"
              type="number"
              step="0.001"
              defaultValue={progress.op_num_end ?? ""}
              placeholder="结束里程"
            />
          </div>

          {state?.errors && (
            <div className="text-sm text-red-500">
              {Object.entries(state.errors).map(([key, messages]) => (
                <p key={key}>
                  {key}: {(messages as string[]).join(", ")}
                </p>
              ))}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "保存中..." : "保存"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
