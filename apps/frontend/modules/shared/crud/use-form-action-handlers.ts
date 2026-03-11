// use-form-action-handlers.ts

import { ActionResult } from "../contracts";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

type Router = ReturnType<typeof useRouter>;

export function useFormActionHandlers(router: Router) {
  const handleSuccess = (result: ActionResult<any>, redirect?: string) => {
    if (result.message) {
      toast.success(result.message);
    } else {
      toast.success("操作成功");
    }

    if (redirect) {
      router.push(redirect);
    }
  };

  const handleError = (result: ActionResult<any>, form?: any) => {
    if (result.success) return;

    result.message && toast.error(result.message);

    if (result.errors && form) {
      Object.entries(result.errors).forEach(([key, value]) => {
        form.setError(key as any, {
          message: value[0],
        });
      });
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return {
    handleSuccess,
    handleError,
    handleCancel,
  };
}
