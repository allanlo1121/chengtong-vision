// export type ServiceResult<T = unknown> =
//   | {
//     success: true;
//     data: T;
//     message?: string;
//   }
//   | {
//     success: false;
//     message?: string;
//     errors?: Record<string, string[]>;
//   };

export type Result<T = unknown> =
  | {
      success: true;
      data: T;
      message?: string;
    }
  | {
      success: false;
      message?: string;
      errors?: Record<string, string[]>;
    };

import type { ErrorCode, ErrorType, FieldErrors } from "./error-codes";

export type ServiceResult<T = unknown> =
  | {
      success: true;
      data: T;
      message?: string;
      warnings?: string[];
    }
  | {
      success: false;
      message: string;
      errors?: FieldErrors;
      errorCode: ErrorCode;
      errorType: ErrorType;
    };
