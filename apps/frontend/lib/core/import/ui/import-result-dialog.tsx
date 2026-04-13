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
import { SyncImportResult } from "../types";

type Props = {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
  onBack: () => void;

  result: SyncImportResult | null;

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

  const total = result.inserted + result.updated + result.failed + result.skipped;

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>导入结果</AlertDialogTitle>

          <AlertDialogDescription className="space-y-2">
            <span className="block ">总数据：{total}</span>
            <span className="block text-green-600">插入：{result.inserted}</span>
            <span className="block text-blue-600">更新：{result.updated}</span>
            <span className="block text-red-600">失败：{result.failed}</span>
            <span className="block text-red-600">跳过：{result.skipped}</span>
            <span className="block border-t pt-2 text-sm text-muted-foreground">
              未导入（前端校验失败）：{failedRowsCount}
            </span>
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
