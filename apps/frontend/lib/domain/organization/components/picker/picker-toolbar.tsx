"use client";

import { Input } from "@/components/ui/input";

import type { OrganizationPickerQuery } from "../../types";

type Props = {
  query: OrganizationPickerQuery;

  onChange: (query: OrganizationPickerQuery) => void;
};

export function PickerToolbar({ query, onChange }: Props) {
  return (
    <div className="flex gap-2">
      <Input
        placeholder="搜索项目名称"
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
