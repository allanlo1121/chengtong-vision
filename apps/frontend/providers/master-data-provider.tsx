// frontend/providers/master-data-provider.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { MasterDataContext } from "./master-data-context";
import { PRELOAD_MASTER_DOMAINS } from "@frontend/constants/master-data-preload";
import { fetchMasterOptionsClient } from "@frontend/services/master-data/fetch.client";
import type { MasterDomainCode } from "@frontend/constants/master-data-type";
import type { MasterOption } from "@frontend/types/master";

type MasterDataMap = Record<MasterDomainCode, MasterOption[]>;

export function MasterDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Partial<MasterDataMap>>({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function preload() {
      try {
        const results = await Promise.all(
          PRELOAD_MASTER_DOMAINS.map(async (domain) => {
            const options = await fetchMasterOptionsClient(domain);
            return [domain, options] as const;
          })
        );

        if (cancelled) return;

        const map: Partial<MasterDataMap> = {};
        results.forEach(([domain, options]) => {
          map[domain] = options;
        });

        setData(map);
        setIsReady(true);
      } catch (err) {
        console.error("Failed to preload master data", err);
        setIsReady(true); // 不阻塞应用
      }
    }

    preload();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(
    () => ({
      isReady,
      getOptions(domain: MasterDomainCode): MasterOption[] {
        return data[domain] ?? [];
      },
    }),
    [data, isReady]
  );

  return <MasterDataContext.Provider value={value}>{children}</MasterDataContext.Provider>;
}
