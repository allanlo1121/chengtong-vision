'use client';

import { useEffect } from 'react';
import { useTunnelFilter } from '@/contexts/TunnelFilterProvider';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

const ALL_VALUE = '__all__';

export default function TunnelFilterBar() {
  const { filter, setFilter, regions, tunnels, projects } = useTunnelFilter();

  const filteredTunnels = filter.projectId
    ? tunnels.filter((t) => t.projectId === filter.projectId)
    : tunnels;

  const currentRegion = regions.find((r) => r === filter.region);
  const currentProject = projects.find((p) => p.id === filter.projectId);
  const currentTunnel = tunnels.find((t) => t.id === filter.tunnelId);

  useEffect(() => {
    const validProject = projects.find((p) => p.id === filter.projectId);
    if (!validProject) {
      console.log("set filter: invalid projectId", filter.projectId,new Date().toISOString());
      
      setFilter({ ...filter, projectId: null, tunnelId: null });
    }

    const validTunnel = filteredTunnels.find((t) => t.id === filter.tunnelId);
    if (!validTunnel) {
      console.log("set filter: invalid tunnelId", filter.tunnelId,new Date().toISOString());
      setFilter({ ...filter, tunnelId: null });
    }
  }, [filter.region, filter.projectId]);

  return (
    <div className="flex gap-4 text-sm items-center">
      {/* 区域 */}
      <Select
        value={filter.region ?? ALL_VALUE}
        onValueChange={(val) =>
          setFilter({
            region: val === ALL_VALUE ? null : val,
            projectId: null,
            tunnelId: null,
          })
        }
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="选择区域">
            {currentRegion || '全部区域'}
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

      {/* 项目 */}
      <Select
        value={filter.projectId ?? ALL_VALUE}
        onValueChange={(val) => {
          if (val === ALL_VALUE) {
            setFilter({ ...filter, projectId: null, tunnelId: null });
          } else {
            const selectedProject = projects.find((p) => p.id === val);
            if (selectedProject) {
              setFilter({
                ...filter,
                projectId: selectedProject.id,
                region: selectedProject.region,
                tunnelId: null,
              });
            }
          }
        }}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="选择项目">
            {currentProject?.name || '全部项目'}
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

      {/* 隧道 */}
      <Select
        value={filter.tunnelId ?? ALL_VALUE}
        onValueChange={(val) => {
          if (val === ALL_VALUE) {
            setFilter({ ...filter, tunnelId: null });
          } else {
            const selectedTunnel = tunnels.find((t) => t.id === val);
            if (selectedTunnel) {
              setFilter({
                tunnelId: selectedTunnel.id,
                projectId: selectedTunnel.projectId,
                region: selectedTunnel.regionName,
              });
            }
          }
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="选择隧道">
            {currentTunnel?.shortName || '全部隧道'}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_VALUE}>全部隧道</SelectItem>
          {filteredTunnels.map((t) => (
            <SelectItem key={t.id} value={t.id}>
              {t.shortName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
