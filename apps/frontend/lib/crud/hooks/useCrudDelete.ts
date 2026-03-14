"use client";

import { Result } from "@/modules/shared/contracts";
import { useCrudMutation } from "./useCrudMutation";

export function useCrudDelete<T>(
  action: (id: string) => Promise<Result<T>>,
  onSuccess?: () => void
) {
  const mutation = useCrudMutation<string, T>({
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
