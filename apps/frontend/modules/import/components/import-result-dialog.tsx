"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

type Props = {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
  onBack: () => void;

  result: {
    total: number;
    successCount: number;
    failedCount: number;
  } | null;

  failedRowsCount: number;
};

export function ImportResultDialog({
  open,
  onClose,
  onContinue,
  onBack,
  result,
  failedRowsCount,
}: Props) {
  if (!result) return null;

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>导入结果</AlertDialogTitle>

          <AlertDialogDescription className="space-y-2">
            <div>总数据：{result.total}</div>
            <div className="text-green-600">成功：{result.successCount}</div>
            <div className="text-red-600">失败：{result.failedCount}</div>

            <div className="border-t pt-2 text-sm text-muted-foreground">
              未导入（前端校验失败）：{failedRowsCount}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          {/* 返回列表 */}
          <AlertDialogCancel onClick={onBack}>返回列表</AlertDialogCancel>

          {/* 继续导入 */}
          {failedRowsCount > 0 && (
            <AlertDialogAction onClick={onContinue}>继续导入失败数据</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
