import { useCrudMutation } from "@/lib/crud/hooks/use-crud-mutation";

interface CreateOptions<TInput, TResult> {
  action: (data: TInput) => Promise<any>;
  onSuccess?: (data: TResult) => void;
}

export function useCreate<TInput, TResult>({ action, onSuccess }: CreateOptions<TInput, TResult>) {
  return useCrudMutation<TInput, TResult>({
    action,
    successMessage: "创建成功",
    onSuccess,
  });
}
