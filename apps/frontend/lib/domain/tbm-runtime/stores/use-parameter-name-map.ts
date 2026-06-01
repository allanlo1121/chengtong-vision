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
    const { isLoaded, isLoading } = get();

    if (isLoaded || isLoading) return;

    set({ isLoading: true, error: null });

    const supabase = createClient();

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbm_runtime_parameters")
      .select("code, name, unit")
      .eq("is_disabled", false)
      .order("sort_order", { ascending: true });

    console.log("加载参数定义", { data, error });

    if (error) {
      console.error("加载参数定义失败:", error);

      set({
        isLoading: false,
        error: error.message,
      });

      return;
    }

    const codeToMeta = Object.fromEntries(
      (data ?? []).map((item) => [
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
