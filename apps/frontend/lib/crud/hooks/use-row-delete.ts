"use client";

import { useCrudMutation } from "@/lib/crud/hooks/use-crud-mutation";

interface RowDeleteOptions<T> {
  action: (id: string) => Promise<any>;
  onSuccess?: () => void;
}

export function useRowDelete<T>({ action, onSuccess }: RowDeleteOptions<T>) {
  const mutation = useCrudMutation<string, any>({
    action,
    successMessage: "删除成功",
    onSuccess: () => {
      onSuccess?.();
    },
  });

  const deleteRow = (id: string) => {
    mutation.mutate(id);
  };

  return {
    deleteRow,
    isDeleting: mutation.isPending,
  };
}
