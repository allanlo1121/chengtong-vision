"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { z } from "zod";

export function useQueryState<T extends z.ZodTypeAny>(schema: T) {
  const router = useRouter();

  const params = useSearchParams();

  // =====================================
  // parse
  // =====================================

  const query = schema.parse(Object.fromEntries(params.entries()));

  // =====================================
  // update
  // =====================================

  function updateQuery(patch: Partial<z.infer<T>>) {
    const next = new URLSearchParams(params.toString());

    Object.entries(patch).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "" || value === false) {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
    });

    router.replace(`?${next.toString()}`);
  }

  return {
    query,

    updateQuery,
  };
}
