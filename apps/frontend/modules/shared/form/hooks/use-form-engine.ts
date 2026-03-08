import { useEffect } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { FieldDefinition } from "../types/field.types";
import { runDependencyEngine } from "../engines/dependency-engine";
import { runComputedEngine } from "../engines/computed-engine";

export function useFormEngine<T extends FieldValues>(
  fields: FieldDefinition<T>[],
  form: UseFormReturn<T>
) {
  useEffect(() => {
    const subscription = form.watch((values) => {
      const v = values as T;

      runDependencyEngine(fields, v, form);

      runComputedEngine(fields, v, form);
    });

    return () => subscription.unsubscribe();
  }, [fields, form]);
}
