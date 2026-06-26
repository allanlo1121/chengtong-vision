// use-form-action-handlers.ts

import { ActionResult } from "../contracts";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

type Router = ReturnType<typeof useRouter>;

export function useFormActionHandlers(router: Router) {
  const handleSuccess = <T>(result: ActionResult<T>, redirect?: string) => {
    if (!result.success) return;

    toast.success(result.message || "操作成功");

    if (result.warnings?.length) {
      result.warnings.forEach((warning) => {
        toast.warning(warning);
      });
    }

    const nextRedirect = result.nextAction?.type === "redirect" ? result.nextAction.href : redirect;

    if (nextRedirect) {
      router.push(nextRedirect);
    }
  };

  const handleError = (result: ActionResult<any>, form?: any) => {
    if (result.success) return;

    const toastMessage = result.message || "操作失败";

    if (result.errorLevel === "warning") {
      toast.warning(toastMessage);
    } else {
      toast.error(toastMessage);
    }

    if (result.errors && form) {
      Object.entries(result.errors).forEach(([key, value]) => {
        if (!value?.[0]) return;

        if (key === "form" || key === "_form") {
          form.setError("root", {
            message: value[0],
          });
          return;
        }

        form.setError(key as any, {
          message: value[0],
        });
      });
    }

    if (result.nextAction?.type === "redirect" && result.nextAction.href) {
      router.push(result.nextAction.href);
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
