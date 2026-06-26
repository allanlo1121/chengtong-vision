"use client";

import { create } from "zustand";
import { createClient } from "@/lib/infra/supabase/client";

export interface ParameterMeta {
  name: string;
  unit?: string | null;
}

interface ParameterNameStore {
  codeToMeta: Record<string, ParameterMeta>;
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;

  getName: (code: string) => string;
  getNameWithUnit: (code: string) => string;
  loadParameterMetaMap: () => Promise<void>;
  reset: () => void;
}

const PAGE_SIZE = 1000;

export const useParameterNameMap = create<ParameterNameStore>((set, get) => ({
  codeToMeta: {},
  isLoaded: false,
  isLoading: false,
  error: null,

  getName: (code) => {
    return get().codeToMeta[code]?.name ?? code;
  },

  getNameWithUnit: (code) => {
    const meta = get().codeToMeta[code];

    if (!meta) return code;

    return meta.unit ? `${meta.name} (${meta.unit})` : meta.name;
  },

  loadParameterMetaMap: async () => {
    console.log("开始加载参数定义");
    const { isLoaded, isLoading } = get();

    if (isLoaded || isLoading) return;

    set({ isLoading: true, error: null });

    const supabase = createClient();

    let from = 0;
    let all: { code: string; name: string; unit: string | null }[] = [];

    while (true) {
      const to = from + PAGE_SIZE - 1;

      const { data, error } = await supabase
        .schema("tbm")
        .from("tbm_runtime_parameters")
        .select("code, name, unit")
        .eq("is_disabled", false)
        .order("sort_order", { ascending: true })
        .range(from, to);

      if (error) {
        console.error("加载参数定义失败:", error);
        set({
          isLoading: false,
          error: error.message,
        });
        return;
      }

      all = all.concat(data ?? []);

      if (!data || data.length < PAGE_SIZE) break;

      from += PAGE_SIZE;
    }

    console.log("完成加载参数定义, 共", all.length, "条");

    const codeToMeta = Object.fromEntries(
      (all ?? []).map((item) => [
        item.code,
        {
          name: item.name,
          unit: item.unit,
        },
      ])
    );

    set({
      codeToMeta,
      isLoaded: true,
      isLoading: false,
      error: null,
    });
  },

  reset: () => {
    set({
      codeToMeta: {},
      isLoaded: false,
      isLoading: false,
      error: null,
    });
  },
}));
