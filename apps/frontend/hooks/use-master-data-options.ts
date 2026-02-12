"use client";

import { useQuery } from "@tanstack/react-query";
import type { MasterDomainCode } from "@frontend/constants/master-data-type";
import { fetchMasterOptionsClient } from "@frontend/services/master-data/fetch.client";

export function useMasterOptions(domainCode: MasterDomainCode) {
  return useQuery({
    queryKey: ["master-options", domainCode],
    queryFn: () => fetchMasterOptionsClient(domainCode),
    staleTime: 1000 * 60 * 10,
  });
}
