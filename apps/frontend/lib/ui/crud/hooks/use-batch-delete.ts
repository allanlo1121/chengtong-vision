"use client";

import { useCrudMutation } from "./use-crud-mutation";

interface BatchDeleteOptions {
  action: (ids: string[]) => Promise<any>;
  onSuccess?: () => void;
}

export function useBatchDelete({ action, onSuccess }: BatchDeleteOptions) {
  const mutation = useCrudMutation<string[], number>({
    action,
    successMessage: "删除成功",
    onSuccess: () => {
      onSuccess?.();
    },
  });

  const deleteRows = (ids: string[]) => {
    mutation.mutate(ids);
  };

  return {
    deleteRows,
    isDeleting: mutation.isPending,
  };
}
