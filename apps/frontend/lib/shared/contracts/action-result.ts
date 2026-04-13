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

// import { ServiceResult } from "./service-result";

// export type ActionResult<T> = ServiceResult<T>;
