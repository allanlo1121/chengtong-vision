"use client";

import { ParameterSelector } from "@/components/domain/tbm-runtime/filters/ParameterSelector";
import type { ParameterGroup } from "@/lib/domain/tbm-runtime/types";

export function RuntimeParameterSidebar({
  groups,
  value,
  onChange,
}: {
  groups: ParameterGroup[];
  value: string[];
  onChange: (selected: string[]) => void;
}) {
  return <ParameterSelector groups={groups} value={value} onChange={onChange} />;
}
