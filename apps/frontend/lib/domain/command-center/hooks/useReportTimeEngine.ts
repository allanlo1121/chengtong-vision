"use client";

import { useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type Period = "daily" | "weekly" | "monthly" | "custom";

export function useReportTimeEngine() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ===============================
  // 1️⃣ parse URL → query
  // ===============================
  const query = useMemo(() => {
    return {
      period: (searchParams.get("period") as Period) ?? "daily",
      date: searchParams.get("date") ?? undefined,
      week: searchParams.get("week") ?? undefined,
      month: searchParams.get("month") ?? undefined,
      from: searchParams.get("from") ?? undefined,
      to: searchParams.get("to") ?? undefined,
    };
  }, [searchParams]);

  // ===============================
  // 2️⃣ normalize → from/to
  // ===============================
  const normalized = useMemo(() => {
    const today = new Date();

    switch (query.period) {
      case "daily": {
        const date = query.date ?? formatDate(today);
        return {
          ...query,
          from: date,
          to: date,
        };
      }

      case "weekly": {
        const { from, to } = weekToRange(query.week ?? getCurrentWeek());
        return { ...query, from, to };
      }

      case "monthly": {
        const { from, to } = monthToRange(query.month ?? getCurrentMonth());
        return { ...query, from, to };
      }

      case "custom":
        return query;
    }
  }, [query]);

  // ===============================
  // 3️⃣ update URL
  // ===============================
  const update = (patch: Partial<typeof query>) => {
    const next = { ...query, ...patch };

    const params = new URLSearchParams();

    Object.entries(next).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        params.set(k, String(v));
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  // ===============================
  // 4️⃣ setters (UI API)
  // ===============================
  const setPeriod = (period: Period) => {
    update({
      period,

      // reset others
      date: undefined,
      week: undefined,
      month: undefined,
      from: undefined,
      to: undefined,
    });
  };

  const setDate = (date: string) => {
    update({ period: "daily", date });
  };

  const setWeek = (week: string) => {
    update({ period: "weekly", week });
  };

  const setMonth = (month: string) => {
    update({ period: "monthly", month });
  };

  const setRange = (from: string, to: string) => {
    update({ period: "custom", from, to });
  };

  return {
    query,
    normalized, // ⭐ 最重要：用于DB
    setPeriod,
    setDate,
    setWeek,
    setMonth,
    setRange,
  };
}
