import { useEffect, useState } from "react";
import { FieldValues, Path, UseFormReturn, useWatch } from "react-hook-form";
import { OptionConfig, TreeOptionConfig } from "../../options/types";
import { SelectOption } from "@/modules/shared/options/types";
import { ValueResolver } from "../types/field.types";
import { getOptions, getAsyncOptions, getTreeOptions } from "../../options/services/option.service";
import { resolveValue } from "../engines/value-resolver";
import useSWR from "swr";

export function useFieldOptions<T extends FieldValues>(
  option: ValueResolver<T, OptionConfig> | undefined,
  form: UseFormReturn<T>,
  dependsOn?: Path<T>[]
) {
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

export function useFieldTreeOptions<T extends FieldValues>(
  option: ValueResolver<T, TreeOptionConfig> | undefined,
  form: UseFormReturn<T>,
  dependsOn?: Path<T>[]
) {
  const deps = useWatch({
    control: form.control,
    name: dependsOn ?? [],
  });
  const depsReady = !dependsOn || deps.every((v) => v !== undefined && v !== null && v !== "");

  const values = form.getValues();

  const config = resolveValue(option, values);

  const key = config && depsReady ? ["tree-options", config.source, config.parentId] : null;

  const { data, error, isLoading, mutate } = useSWR(key, () => getTreeOptions(config!), {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  return {
    options: data ?? [],
    loading: isLoading,
    error,
    reload: mutate,
  };
}
