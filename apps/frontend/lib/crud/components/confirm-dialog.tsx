"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ConfirmDialogProps {
  title: string;
  description?: string;

  /**
   * 异步确认函数
   * 可以返回 Promise
   */
  onConfirm: () => Promise<any> | any;

  /**
   * 自定义按钮文本
   */
  confirmText?: string;
  cancelText?: string;

  /**
   * 是否禁用
   */
  disabled?: boolean;

  /**
   * 外部控制模式（可选）
   */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  /**
   * 触发器按钮（必须传）
   */
  children: React.ReactNode;
}

export function ConfirmDialog({
  title,
  description,
  onConfirm,
  confirmText = "确认",
  cancelText = "取消",
  disabled = false,
  open,
  onOpenChange,
  children,
}: ConfirmDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const isControlled = open !== undefined;
  const dialogOpen = isControlled ? open : internalOpen;

  const setOpen = (value: boolean) => {
    if (isControlled) {
      onOpenChange?.(value);
    } else {
      setInternalOpen(value);
    }
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      setError(null);

      await onConfirm();

      setOpen(false);
    } catch (err: any) {
      setError(err?.message || "操作失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild disabled={disabled}>
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>

          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>

        {error && <div className="text-sm text-destructive mt-2">{error}</div>}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>{cancelText}</AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={handleConfirm} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {confirmText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
