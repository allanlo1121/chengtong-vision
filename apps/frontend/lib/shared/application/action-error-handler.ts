// modules/shared/application/action-error-handler.ts

import { AppError } from "../errors/app-error";
import { ERROR_CODES } from "../contracts/error-codes";
import type { FailureResult } from "../contracts/action-result";

export function mapErrorToActionResult(e: unknown): FailureResult {
  if (e instanceof AppError) {
    return {
      success: false,
      error: e.message,
      code: e.code,
      details: e.details,
    };
  }

  return {
    success: false,
    error: "Unexpected error",
    code: ERROR_CODES.INTERNAL_ERROR,
  };
}
