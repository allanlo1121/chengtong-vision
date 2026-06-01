// action-result.ts

import {
  AppError,
  ERROR_CODES,
  ERROR_TYPES,
  ErrorCode,
  ErrorType,
  FieldErrors,
  getErrorMessage,
} from "./error-codes";

export type ActionErrorLevel = "warning" | "error" | "fatal";

export type ActionNextAction = {
  type: "retry" | "confirm" | "redirect";
  label?: string;
  href?: string;
};

export type ActionResult<T = unknown> =
  | {
      success: true;
      data: T;
      message?: string;
      warnings?: string[];
      nextAction?: ActionNextAction;
    }
  | {
      success: false;
      message: string;
      errors?: FieldErrors;
      errorCode?: ErrorCode;
      errorType?: ErrorType;
      errorLevel?: ActionErrorLevel;
      nextAction?: ActionNextAction;
    };

export function getActionErrorLevel(type: ErrorType): ActionErrorLevel {
  switch (type) {
    case ERROR_TYPES.VALIDATION:
      return "warning";
    case ERROR_TYPES.BUSINESS:
      return "warning";
    case ERROR_TYPES.CONFLICT:
      return "warning";
    case ERROR_TYPES.PERMISSION:
      return "error";
    case ERROR_TYPES.SYSTEM:
    default:
      return "error";
  }
}

export function toActionError(error: unknown): Extract<ActionResult, { success: false }> {
  if (error instanceof AppError) {
    return {
      success: false,
      message: error.message,
      errors: error.errors ?? {
        form: [error.message],
      },
      errorCode: error.code,
      errorType: error.type,
      errorLevel: getActionErrorLevel(error.type),
    };
  }

  console.error(error);
  console.error(getErrorMessage(error));
  return {
    success: false,
    message: "系统异常，请稍后重试",
    errors: {
      form: ["系统异常，请稍后重试"],
    },
    errorCode: ERROR_CODES.INTERNAL_ERROR,
    errorType: ERROR_TYPES.SYSTEM,
    errorLevel: "error",
  };
}
