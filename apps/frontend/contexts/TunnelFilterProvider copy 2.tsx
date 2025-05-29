"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { createClient } from "@/utils/supabase/client";
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Tunnel, TunnelFilterContextType } from '@/lib/mappers/mapTunnelRawToCamelCase'


// 筛选状态类型
type FilterState = {
    region: string | null;
    projectId: string | null;
    tunnelId: string | null;
};

// 项目类型（增加 region）
type Project = {
    id: string;
    name: string;
    region: string;
};

// 隧道类型（增加 project_id）
type Tunnel = {
    id: string;
    short_name: string;
    region_name: string;
    project_id: string;
    project_short_name: string;
    status: string;
    ring_start: number;
    ring_end: number;
    total: number;
    op_num_start: number;
    op_num_end: number;
    current_op: number;
    current_ring: number;
    tbm_name: string;
};

// 上下文类型
type TunnelFilterContextType = {
    tunnels: Tunnel[];
    tunnelIds: string[];
    projects: Project[];
    regions: string[];
    filter: FilterState;
    setFilter: (filter: FilterState) => void;
    setProjects: (projects: Project[]) => void;
};

const TunnelFilterContext = createContext<TunnelFilterContextType>({
    tunnels: [],
    tunnelIds: [],
    projects: [],
    regions: [],
    filter: { projectId: null, region: null, tunnelId: null },
    setFilter: () => {},
    setProjects: () => {},
});

export function useTunnelFilter() {
    return useContext(TunnelFilterContext);
}

export function TunnelFilterProvider({
    children,
    tunnelRefenshCount = 0,
}: {
    children: ReactNode;
    tunnelRefenshCount?: number;
}) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [regions, setRegions] = useState<string[]>([]);
    const [tunnels, setTunnels] = useState<Tunnel[]>([]);
    const [filter, setFilter] = useState<FilterState>({
        region: null,
        projectId: null,
        tunnelId: null,
    });

    const supabase = createClient();

    // 加载区域
    useEffect(() => {
        const loadRegions = async () => {
            const { data: regData } = await supabase.from("regions").select("name");
            if (regData) setRegions(regData.map((r) => r.name));
        };
        loadRegions();
    }, []);

    // 加载隧道（不受 filter.projectId 影响，只受 region 限制）
    useEffect(() => {
        const loadTunnels = async () => {
            let query = supabase.from("v_tunnels_overview").select("*");

            if (filter.region) {
                query = query.eq("region_name", filter.region);
            }

            const { data, error } = await query;
            if (!error && data) {
                const withTotal = data.map((t) => ({
                    ...t,
                    total:
                        t.ring_end != null && t.ring_start != null
                            ? t.ring_end - t.ring_start
                            : 0,
                }));

                setTunnels(withTotal);

                console.log("加载隧道数据:", withTotal);
                

                const derivedProjects = Array.from(
                    new Map(
                        withTotal.map((t) => [
                            t.project_short_name,
                            {
                                id: t.project_short_name,
                                name: t.project_short_name,
                                region: t.region_name,
                            },
                        ])
                    ).values()
                );
                console.log("推导项目列表:", derivedProjects);
                setProjects(derivedProjects);
            }
        };

        loadTunnels();
    }, [filter.region, tunnelRefenshCount]);

    const tunnelIds = tunnels
        .filter((t) => !filter.projectId || t.project_id === filter.projectId)
        .map((t) => t.id);

    return (
        <TunnelFilterContext.Provider
            value={{ tunnels, tunnelIds, projects, regions, filter, setFilter, setProjects }}
        >
            {children}
        </TunnelFilterContext.Provider>
    );
}
