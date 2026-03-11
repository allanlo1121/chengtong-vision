// action-result.ts

export interface SuccessResult<T> {
  success: true;
  data?: T;
  message?: string;
}

export interface FailureResult {
  success: false;
  errors?: Record<string, string[]>;
  message?: string;
}

export type ActionResult<T> = SuccessResult<T> | FailureResult;
