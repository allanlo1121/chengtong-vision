"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useParameterQueryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setSubsystemId = (subsystemId?: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (subsystemId) {
      params.set("subsystemId", String(subsystemId));
    } else {
      params.delete("subsystemId");
    }

    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  return {
    selectedSubsystemId: searchParams.get("subsystemId")
      ? Number(searchParams.get("subsystemId"))
      : undefined,
    setSubsystemId,
  };
}
