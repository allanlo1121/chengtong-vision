import { useState } from "react";
import { getAsyncOptions } from "../services/option.service";
import { AsyncOptionConfig, SelectOption } from "../types";

export function useAsyncOptions(config: AsyncOptionConfig) {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);

  async function search(keyword: string) {
    setLoading(true);

    const data = await getAsyncOptions(config, keyword);

    setOptions(data);

    setLoading(false);
  }

  return {
    options,
    search,
    loading,
  };
}
