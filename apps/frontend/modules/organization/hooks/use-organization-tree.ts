// modules/organization/hooks/use-organization-tree.ts
"use client";

import useSWR from "swr";
import { getOrganizationTree } from "../services";

export function useOrganizationTree(parentId: string | null) {
  const key = ["organization-tree", parentId];

  const { data, error, isLoading, mutate } = useSWR(key, async () => {
    const res = await getOrganizationTree(parentId);
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  });

  return {
    nodes: data ?? [],
    loading: isLoading,
    error,
    reload: mutate,
  };
}
