"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { OrganizationPickerQuery } from "../../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  query: OrganizationPickerQuery;

  onChange: (query: OrganizationPickerQuery) => void;
};

export function PickerToolbar({ query, onChange }: Props) {
  return (
    <div className="flex gap-2">
      <Input
        className="w-64"
        placeholder="搜索组织名称"
        value={query.search ?? ""}
        onChange={(e) =>
          onChange({
            ...query,
            search: e.target.value,
            page: 1,
          })
        }
      />

      <Select
        value={query.orgTypeName ?? ""}
        onValueChange={(value) =>
          onChange({
            ...query,
            orgTypeName: value === "all" ? undefined : value,
            page: 1,
          })
        }
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="组织类型" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">全部类型</SelectItem>

          <SelectItem value="生产性子公司">公司</SelectItem>

          <SelectItem value="项目部">项目部</SelectItem>

          <SelectItem value="部门">部门</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        onClick={() =>
          onChange({
            page: 1,
            pageSize: query.pageSize,
          })
        }
      >
        重置
      </Button>
    </div>
  );
}
