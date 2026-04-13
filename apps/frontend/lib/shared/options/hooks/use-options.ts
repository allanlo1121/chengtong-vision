import useSWR from "swr";
import { getOptions } from "../services/option.service";
import { OptionConfig, SelectOption, UseOptionsResult } from "../types";
import { useState } from "react";

export function useOptions(config: OptionConfig): UseOptionsResult {
  const key = config ? ["options", config] : null;

  const { data, isLoading, error } = useSWR(key, () => getOptions(config));

  return {
    options: data ?? [],
    isLoading,
    error,
  };
}
