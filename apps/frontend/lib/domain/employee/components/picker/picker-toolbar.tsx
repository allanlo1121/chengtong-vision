"use client";

import { Input } from "@/components/ui/input";

import type { EmployeePickerQuery } from "../../types";

type Props = {
  query: EmployeePickerQuery;

  onChange: (query: EmployeePickerQuery) => void;
};

export function PickerToolbar({ query, onChange }: Props) {
  return (
    <div className="flex gap-2">
      <Input
        placeholder="搜索员工姓名"
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
