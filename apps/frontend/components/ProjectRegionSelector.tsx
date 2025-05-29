"use client";

import { useTunnelFilter } from "@/contexts/TunnelFilterProvider";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";

const ALL_VALUE = "__all__";

export default function ProjectRegionSelector() {
    const { filter, setFilter, projects, regions } = useTunnelFilter();

    const currentProject = projects.find((p) => p.id === filter.projectId);
    const currentRegion = regions.find((r) => r === filter.region);

    return (
        <div className="flex gap-2 text-sm">
            {/* 区域选择 */}
            <Select
                value={filter.region ?? ALL_VALUE}
                onValueChange={(val) =>
                    setFilter({ ...filter, region: val === ALL_VALUE ? null : val })
                }
            >
                <SelectTrigger className="w-[140px]">
                    <SelectValue
                        placeholder="选择区域"
                        defaultValue={ALL_VALUE}
                    >
                        {currentRegion || "全部区域"}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={ALL_VALUE}>全部区域</SelectItem>
                    {regions.map((r) => (
                        <SelectItem key={r} value={r}>
                            {r}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {/* 项目选择 */}
            <Select
                value={filter.projectId ?? ALL_VALUE}
                onValueChange={(val) =>
                    setFilter({ ...filter, projectId: val === ALL_VALUE ? null : val })
                }
            >
                <SelectTrigger className="w-[160px]">
                    <SelectValue
                        placeholder="选择项目"
                        defaultValue={ALL_VALUE}
                    >
                        {currentProject?.name || "全部项目"}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={ALL_VALUE}>全部项目</SelectItem>
                    {projects.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                            {p.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            
        </div>
    );
}
