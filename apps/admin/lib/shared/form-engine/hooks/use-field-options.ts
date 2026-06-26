import { FieldValues, Path, UseFormReturn, useWatch } from "react-hook-form";
import { OptionConfig } from "../../options/types";

import { ValueResolver } from "../types/field.types";
import { getOptions } from "../../options/services/option.service";
import { resolveValue } from "../engines/value-resolver";
import useSWR from "swr";

export function useFieldOptions<T extends FieldValues, C = any, O = T>(
  option: ValueResolver<T, OptionConfig> | undefined,
  form: UseFormReturn<T, C, O>,
  dependsOn?: Path<T>[]
) {
  //console.log("useFieldOptions", { option, dependsOn });
  const deps = useWatch({
    control: form.control,
    name: dependsOn ?? [],
  });
  const depsReady = !dependsOn || deps.every((v) => v !== undefined && v !== null && v !== "");

  const values = form.getValues();

  const config = resolveValue(option, values);

  const key = config && depsReady ? ["field-options", config] : null;

  const { data, error, isLoading, mutate } = useSWR(key, () => getOptions(config!), {
    revalidateOnFocus: false,
  });

  return {
    options: data ?? [],
    loading: isLoading,
    error,
    reload: mutate,
  };
}
