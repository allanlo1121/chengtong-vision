export type ToSearchParams<T> = {
  [K in keyof T]?: string;
};
