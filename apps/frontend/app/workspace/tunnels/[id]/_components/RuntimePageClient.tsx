// components/domain/tbm-runtime/RuntimePageClient.tsx

"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { ParameterGroup } from "@/lib/domain/tbm-runtime/types";
import {
  RuntimeQueryLimits,
  RuntimeQueryToolbar,
  RuntimeWorkMode,
  type RuntimeQueryDraft,
} from "./RuntimeQueryToolbar";
import { RuntimeParameterSidebar } from "./RuntimeParameterSidebar";
import { RuntimeChartPanel } from "./RuntimeChartPanel";
import { useInitParameterNameMap } from "@/lib/domain/tbm-runtime/hooks/use-init-parameter-name-map";

interface Props {
  tunnelId: string;
  groups: ParameterGroup[];
  limits: RuntimeQueryLimits;
}

export function RuntimePageClient({ tunnelId, groups, limits }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useInitParameterNameMap();

  const initialFields = useMemo(() => {
    return searchParams.get("fields")?.split(",").filter(Boolean) ?? [];
  }, []);

  //   const initialQueryDraft = useMemo<RuntimeQueryDraft>(() => {
  //     const mode = searchParams.get("mode") === "ring" ? "ring" : "time";

  //     return {
  //       mode,
  //       from: searchParams.get("from") ?? "",
  //       to: searchParams.get("to") ?? "",
  //       fromRing: searchParams.get("fromRing") ?? "",
  //       toRing: searchParams.get("toRing") ?? "",
  //     };
  //   }, []);

  const [selectedCodes, setSelectedCodes] = useState<string[]>(initialFields);

  const [queryDraft, setQueryDraft] = useState<RuntimeQueryDraft>(() => {
    const mode = searchParams.get("mode") === "ring" ? "ring" : "time";

    return {
      mode,

      workMode: (searchParams.get("workMode") as RuntimeWorkMode) ?? "all",

      from: searchParams.get("from") ?? "",
      to: searchParams.get("to") ?? limits.maxTime ?? "",

      fromRing: searchParams.get("fromRing") ?? String(limits?.maxRing ?? ""),

      toRing: searchParams.get("toRing") ?? String(limits?.maxRing ?? ""),
    };
  });

  const handleSearch = () => {
    const params = new URLSearchParams();

    params.set("mode", queryDraft.mode);

    if (selectedCodes.length > 0) {
      params.set("fields", selectedCodes.join(","));
    }

    if (queryDraft.mode === "time") {
      params.set("from", queryDraft.from);
      params.set("to", queryDraft.to);
    }

    if (queryDraft.mode === "ring") {
      params.set("fromRing", queryDraft.fromRing);
      params.set("toRing", queryDraft.toRing);
    }

    params.set("workMode", queryDraft.workMode ?? "all");

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex h-full min-h-0 gap-4">
      <aside className="w-80 shrink-0">
        <RuntimeParameterSidebar
          groups={groups}
          value={selectedCodes}
          onChange={setSelectedCodes}
        />
      </aside>

      <main className="flex min-w-0 flex-1 flex-col gap-4">
        <RuntimeQueryToolbar
          value={queryDraft}
          onChange={setQueryDraft}
          onSearch={handleSearch}
          limits={limits}
        />

        <RuntimeChartPanel tunnelId={tunnelId} />
      </main>
    </div>
  );
}
