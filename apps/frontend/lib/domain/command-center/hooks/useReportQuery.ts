"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { reportQuery } from "../queries";

export function useReportQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * 1. 解析当前 URL → typed query
   */
  const query = useMemo(() => {
    const raw: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      raw[key] = value;
    });

    return reportQuery.parse(raw);
  }, [searchParams]);

  /**
   * 2. 更新 query（核心能力）
   */
  const setQuery = (patch: Partial<typeof query>) => {
    const next = {
      ...query,
      ...patch,
    };

    const params = new URLSearchParams();

    Object.entries(next).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.set(key, String(value));
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  /**
   * 3. 常用快捷方法（重点）
   */
  const setPeriod = (period: typeof query.period) => {
    setQuery({ period });

    // custom 自动补默认值逻辑（可选）
    if (period !== "custom") {
      setQuery({
        from: undefined,
        to: undefined,
      });
    }
  };

  const setDateRange = (from: string, to: string) => {
    setQuery({
      period: "custom",
      from,
      to,
    });
  };

  return {
    query,
    setQuery,

    // shortcuts
    setPeriod,
    setDateRange,
  };
}
