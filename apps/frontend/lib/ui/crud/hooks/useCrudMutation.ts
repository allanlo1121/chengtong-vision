"use client";

import { useTransition, useState } from "react";
import { toast } from "sonner";

import type { Result } from "@/lib/shared/contracts";

export interface CrudMutationOptions<TInput, TResult> {
  action: (input: TInput) => Promise<Result<TResult>>;
  successMessage?: string;
  onSuccess?: (data: TResult) => void;
  onError?: (message: string) => void;
}

export function useCrudMutation<TInput, TResult>(options: CrudMutationOptions<TInput, TResult>) {
  const { action, successMessage, onSuccess, onError } = options;
  //  console.log("===deleteMutation===",action)

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const mutate = (input: TInput) => {
    startTransition(async () => {
      setError(null);

      const res = await action(input);

      if (!res.success) {
        const msg = res.message ?? "操作失败";

        setError(msg);
        toast.error(msg);

        onError?.(msg);

        return;
      }

      if (successMessage) {
        toast.success(successMessage);
      }

      onSuccess?.(res.data);
    });
  };

  return {
    mutate,
    isPending,
    error,
  };
}
