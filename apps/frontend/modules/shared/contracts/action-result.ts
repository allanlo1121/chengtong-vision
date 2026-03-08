// action-result.ts

export interface SuccessResult<T> {
  success: true;
  data: T;
  message?: string;
  meta?: Record<string, any>;
}

export interface FailureResult {
  success: false;
  error: string;
  code?: string; // 业务错误码
  details?: any; // 扩展错误信息
}

export type ActionResult<T> = SuccessResult<T> | FailureResult;
