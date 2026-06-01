"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { z } from "zod";

export function useQueryState<T extends z.ZodTypeAny>(schema: T) {
  const router = useRouter();

  const params = useSearchParams();

  const query = schema.parse(Object.fromEntries(params.entries()));

  function updateQuery(patch: Partial<z.infer<T>>) {
    const newParams = new URLSearchParams(params.toString());

    Object.entries(patch).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "" || value === false) {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });

    router.replace(`?${newParams.toString()}`);
  }

  return {
    query,

    updateQuery,
  };
}
