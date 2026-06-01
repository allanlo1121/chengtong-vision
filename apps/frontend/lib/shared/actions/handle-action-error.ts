const handleError = (result: ActionResult<any>, form?: any) => {
  if (result.success) {
    return;
  }

  // =====================================
  // toast
  // =====================================

  if (result.message) {
    switch (result.errorLevel) {
      case "warning":
        toast.warning(result.message);

        break;

      case "fatal":
        toast.error(result.message);

        break;

      default:
        toast.error(result.message);
    }
  }

  // =====================================
  // form errors
  // =====================================

  if (result.errors && form) {
    Object.entries(result.errors).forEach(([key, value]) => {
      form.setError(key as any, {
        message: value[0],
      });
    });
  }

  // =====================================
  // next action
  // =====================================

  if (result.nextAction?.type === "redirect" && result.nextAction.href) {
    router.push(result.nextAction.href);
  }
};
