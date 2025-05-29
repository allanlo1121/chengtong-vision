"use client";

import { useTunnelFilter } from "@/contexts/TunnelFilterProvider";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function TunnelSelectorBar() {
  const { filter, setFilter, projects, regions } = useTunnelFilter();

  return (
    <div className="flex gap-4 mb-4 ">
      {/* 项目选择 */}
      <Select
        value={filter.projectId ?? ""}
        onValueChange={(val) =>
          setFilter({ ...filter, projectId: val === "" ? null : val })
        }
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="选择项目" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">全部项目</SelectItem>
          {projects.map((p) => (
            <SelectItem key={p.id} value={p.id}>
              {p.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 区域选择 */}
      <Select
        value={filter.region ?? ""}
        onValueChange={(val) =>
          setFilter({ ...filter, region: val === "" ? null : val })
        }
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="选择区域" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">全部区域</SelectItem>
          {regions.map((r) => (
            <SelectItem key={r} value={r}>
              {r}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
