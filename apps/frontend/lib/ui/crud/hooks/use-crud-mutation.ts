import { useState, useTransition } from "react";
import { toast } from "sonner";

interface CrudMutationOptions<TInput, TResult> {
  action: (input: TInput) => Promise<{
    success: boolean;
    data?: TResult;
    error?: string;
  }>;
  onSuccess?: (data: TResult) => void;
  onError?: (error: string) => void;
  successMessage?: string;
}

export function useCrudMutation<TInput, TResult>(options: CrudMutationOptions<TInput, TResult>) {
  const { action, onSuccess, onError, successMessage } = options;

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const mutate = (input: TInput) => {
    startTransition(async () => {
      setError(null);

      const res = await action(input);

      if (!res.success) {
        const msg = res.error || "操作失败";
        setError(msg);
        toast.error(msg);
        onError?.(msg);
        return;
      }

      if (successMessage) {
        toast.success(successMessage);
      }

      onSuccess?.(res.data as TResult);
    });
  };

  return {
    mutate,
    isPending,
    error,
  };
}
