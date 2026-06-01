"use client";

import { Input } from "@/components/ui/input";

import type { TbmPickerQuery } from "../../types/picker.types";

type Props = {
  query: TbmPickerQuery;

  onChange: (query: TbmPickerQuery) => void;
};

export function PickerToolbar({ query, onChange }: Props) {
  return (
    <div className="flex gap-2">
      <Input
        placeholder="搜索TBM名称"
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
