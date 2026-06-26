// error-codes.ts

// error-codes.ts

export const ERROR_TYPES = {
  VALIDATION: "validation",
  BUSINESS: "business",
  PERMISSION: "permission",
  CONFLICT: "conflict",
  SYSTEM: "system",
} as const;

export type ErrorType = (typeof ERROR_TYPES)[keyof typeof ERROR_TYPES];

export const ERROR_CODES = {
  VALIDATION_FAILED: "VALIDATION_FAILED",
  REQUIRED_FIELD_MISSING: "REQUIRED_FIELD_MISSING",

  PERMISSION_DENIED: "PERMISSION_DENIED",

  NOT_FOUND: "NOT_FOUND",
  DUPLICATE_KEY: "DUPLICATE_KEY",
  CONFLICT: "CONFLICT",

  INTERNAL_ERROR: "INTERNAL_ERROR",
  DATABASE_ERROR: "DATABASE_ERROR",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export type FieldErrors = Record<string, string[]>;

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly type: ErrorType;
  readonly errors?: FieldErrors;
  readonly cause?: unknown;

  constructor(options: {
    message: string;
    code: ErrorCode;
    type?: ErrorType;
    errors?: FieldErrors;
    cause?: unknown;
  }) {
    super(options.message);

    this.name = "AppError";
    this.code = options.code;
    this.type = options.type ?? ERROR_TYPES.SYSTEM;
    this.errors = options.errors;
    this.cause = options.cause;
  }
}

export const appErrors = {
  validation(message: string, errors?: FieldErrors) {
    return new AppError({
      message,
      code: ERROR_CODES.VALIDATION_FAILED,
      type: ERROR_TYPES.VALIDATION,
      errors,
    });
  },

  required(field: string, message = "必填字段缺失") {
    return new AppError({
      message,
      code: ERROR_CODES.REQUIRED_FIELD_MISSING,
      type: ERROR_TYPES.VALIDATION,
      errors: {
        [field]: [message],
      },
    });
  },

  notFound(message = "数据不存在") {
    return new AppError({
      message,
      code: ERROR_CODES.NOT_FOUND,
      type: ERROR_TYPES.BUSINESS,
    });
  },

  permissionDenied(message = "没有操作权限") {
    return new AppError({
      message,
      code: ERROR_CODES.PERMISSION_DENIED,
      type: ERROR_TYPES.PERMISSION,
    });
  },

  conflict(message = "数据已存在") {
    return new AppError({
      message,
      code: ERROR_CODES.DUPLICATE_KEY,
      type: ERROR_TYPES.CONFLICT,
    });
  },

  database(message = "数据库操作失败", cause?: unknown) {
    return new AppError({
      message,
      code: ERROR_CODES.DATABASE_ERROR,
      type: ERROR_TYPES.SYSTEM,
      cause,
    });
  },

  internal(message = "系统内部错误", cause?: unknown) {
    return new AppError({
      message,
      code: ERROR_CODES.INTERNAL_ERROR,
      type: ERROR_TYPES.SYSTEM,
      cause,
    });
  },
};

export function getErrorMessage(error: unknown, fallback = "未知错误") {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as { message?: unknown }).message ?? fallback);
  }

  return fallback;
}
