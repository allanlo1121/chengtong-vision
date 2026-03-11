export type ServiceResult<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
};
