import { useEffect, useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { SelectOption } from "@/lib/shared/options/types";

export function useAsyncOptions<T extends FieldValues>(
  resolver: any,
  form: UseFormReturn<T>,
  dependsOn?: Path<T>[]
) {
  const [options, setOptions] = useState<SelectOption[]>([]);

  const values = form.watch(dependsOn ?? []);

  useEffect(() => {
    if (!resolver) return;

    if (Array.isArray(resolver)) {
      setOptions(resolver);
      return;
    }

    resolver(form.getValues()).then(setOptions);
  }, [values]);

  return options;
}
