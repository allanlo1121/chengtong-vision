// engines/condition-engine.ts

import { FieldValues, Resolver } from "react-hook-form";

export function resolveCondition<T extends FieldValues>(
  condition: boolean | ((values: T) => boolean) | undefined,
  values: T
): boolean {
  if (typeof condition === "function") {
    return (condition as (values: T) => boolean)(values);
  }

  return Boolean(condition);
}
