import { useCrudMutation } from "@/lib/crud/hooks/use-crud-mutation";

interface UpdateOptions<TInput, TResult> {
  action: (data: TInput) => Promise<any>;
  onSuccess?: (data: TResult) => void;
}

export function useUpdate<TInput, TResult>({ action, onSuccess }: UpdateOptions<TInput, TResult>) {
  return useCrudMutation<TInput, TResult>({
    action,
    successMessage: "更新成功",
    onSuccess,
  });
}
