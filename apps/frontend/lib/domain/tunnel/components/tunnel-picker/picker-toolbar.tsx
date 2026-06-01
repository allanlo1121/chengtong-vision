"use client";

import { Input } from "@/components/ui/input";

import type { TunnelPickerQuery } from "../../types";

type Props = {
  query: TunnelPickerQuery;

  onChange: (query: TunnelPickerQuery) => void;
};

export function PickerToolbar({ query, onChange }: Props) {
  return (
    <div className="flex gap-2">
      <Input
        placeholder="搜索隧道名称"
        value={query.search}
        onChange={(e) =>
          onChange({
            ...query,
            search: e.target.value,
            page: 1,
          })
        }
      />
    </div>
  );
}
