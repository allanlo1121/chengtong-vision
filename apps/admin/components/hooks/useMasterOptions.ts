// components/hooks/useMasterOptions.ts
"use client";

import { useMemo } from "react";

export type SelectOption = {
  value: string;
  label: string;
};

export function useMasterOptions(options: SelectOption[]) {
  /**
   * 这里用 useMemo 不是为了性能，
   * 而是为了语义：options 是“只读配置”
   */
  return useMemo(() => options, [options]);
}
