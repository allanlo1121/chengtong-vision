"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { TransferList, TransferItem } from "@/components/common/transfer-list";
import { addParametersToTemplateAction } from "@/lib/domain/tbm-runtime/actions/add-paramters-to-template.action";

interface AddTemplateParametersDialogProps {
  templateId?: number;
  parameters: TransferItem[];
}

export function AddTemplateParametersDialog({
  templateId,
  parameters,
}: AddTemplateParametersDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [pending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!templateId) {
      toast.error("请先选择参数模板");
      return;
    }

    if (selectedIds.length === 0) {
      toast.error("请至少选择一个参数");
      return;
    }

    startTransition(async () => {
      const result = await addParametersToTemplateAction({
        templateId,
        parameterIds: selectedIds,
      });

      if (!result.success) {
        toast.error(result.message || "添加失败");
        return;
      }

      toast.success(result.message || "添加成功");
      setSelectedIds([]);
      setOpen(false);
      router.refresh();
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={!templateId}>
          <Plus className="mr-2 size-4" />
          添加参数
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>添加运行参数</DialogTitle>
          <DialogDescription>从运行参数库中选择参数，并添加到当前参数模板。</DialogDescription>
        </DialogHeader>

        <TransferList
          items={parameters}
          value={selectedIds}
          onChange={setSelectedIds}
          leftTitle="可选运行参数"
          rightTitle="待添加参数"
        />

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={pending}>
            取消
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={pending || selectedIds.length === 0}
          >
            确认添加
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
