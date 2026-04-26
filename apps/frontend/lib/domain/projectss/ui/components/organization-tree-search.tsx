"use client";

import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function OrganizationTreeSearch({ value, onChange }: Props) {
  return (
    <div className="p-2">
      <Input placeholder="搜索机构..." value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
