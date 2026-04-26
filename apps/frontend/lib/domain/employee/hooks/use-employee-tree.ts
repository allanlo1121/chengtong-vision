// domain/employee/hooks/use-employee-tree.ts
"use client";

import { useSearchParams, useRouter } from "next/navigation";

export function useEmployeeQuery() {
  const params = useSearchParams();
  const router = useRouter();

  const query = {
    organizationId: params.get("organizationId") ?? undefined,
    includeChildren: params.get("includeChildren") === "true",
    search: params.get("search") ?? "",
    page: Number(params.get("page") ?? 1),
  };

  function updateQuery(patch: Partial<typeof query>) {
    const newParams = new URLSearchParams(params.toString());

    Object.entries(patch).forEach(([key, value]) => {
      if (value === undefined || value === "" || value === false) {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });

    router.push(`?${newParams.toString()}`);
  }

  return {
    query,
    updateQuery,
  };
}
