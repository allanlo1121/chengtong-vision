export type RemoveNull<T> = {
  [K in keyof T]: Exclude<T[K], null>;
};

export type OptionalNullable<T> = {
  [K in keyof T]?: T[K];
};

export type SelectiveRemoveNull<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
