import { FieldValues } from "react-hook-form";
import { ValueResolver } from "../types/field.types";

export function resolveValue<T extends FieldValues, R>(
  value: ValueResolver<T, R> | undefined,
  values: T
): R | undefined {
  if (typeof value === "function") {
    return (value as (values: T) => R)(values);
  }

  return value;
}
