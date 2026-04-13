export type ServiceResult<T = unknown> =
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
