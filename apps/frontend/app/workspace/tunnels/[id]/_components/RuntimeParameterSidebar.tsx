"use client";

import { useState } from "react";
import { ParameterGroup } from "@/lib/domain/tbm-runtime/types";
import { ParameterSelector } from "@/components/domain/tbm-runtime/filters/ParameterSelector";

export function RuntimeParameterSidebar({
  groups,
  value,
  onChange,
}: {
  groups: ParameterGroup[];
  value: string[];
  onChange: (value: string[]) => void;
}) {
  return <ParameterSelector groups={groups} value={value} onChange={onChange} />;
}
