/// A helper function to get typed entries of an object.
export function typedEntries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as any;
}
