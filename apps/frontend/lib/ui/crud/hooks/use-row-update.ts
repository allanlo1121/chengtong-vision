"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type UseRowUpdateOptions<TParams extends any[]> = {
  action: (...args: TParams) => Promise<any>;
  getParams: (id: string, value: any) => TParams;
  successMessage?: string;
};

export function useRowUpdate<TParams extends any[]>({
  action,
  getParams,
  successMessage = "更新成功",
}: UseRowUpdateOptions<TParams>) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const handleUpdate = async (id: string, value: any) => {
    setLoadingId(id);

    try {
      const res = await action(...getParams(id, value));

      if (res.success) {
        toast.success(successMessage);
        router.refresh();
      } else {
        toast.error(res.error ?? "更新失败");
      }
    } finally {
      setLoadingId(null);
    }
  };

  return {
    handleUpdate,
    loadingId,
  };
}
