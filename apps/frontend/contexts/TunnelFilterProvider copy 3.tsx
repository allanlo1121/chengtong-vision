"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";
import type { Tunnel, TunnelFilterContextType } from '@/lib/mappers/mapTunnelRawToCamelCase'
import { mapTunnelsRawBatch } from '@/lib/mappers/mapTunnelRawToCamelCase'

const FILTER_STORAGE_KEY = 'tunnelFilter';

const TunnelFilterContext = createContext<TunnelFilterContextType>({
    tunnels: [],
    tunnelIds: [],
    projects: [],
    regions: [],
    filter: { region: null, projectId: null, tunnelId: null },
    setFilter: () => { },
    setProjects: () => { },
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
    const [projects, setProjects] = useState<TunnelFilterContextType["projects"]>([]);
    const [regions, setRegions] = useState<string[]>([]);
    const [tunnels, setTunnels] = useState<Tunnel[]>([]);
    const [filter, setFilterState] = useState<TunnelFilterContextType["filter"]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(FILTER_STORAGE_KEY);
            if (saved) {
                try {
                    return JSON.parse(saved);
                } catch { }
            }
        }
        return { region: null, projectId: null, tunnelId: null };
    });

    const setFilter = (next: TunnelFilterContextType["filter"]) => {
        setFilterState(next);
        if (typeof window !== 'undefined') {
            localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(next));
        }
    }

    const supabase = createClient();

    // 加载区域
    useEffect(() => {
        const loadRegions = async () => {
            const { data: regData } = await supabase.from("regions").select("name");
            if (regData) setRegions(regData.map((r) => r.name));
        };
        loadRegions();
    }, []);

    // 加载隧道（不受 projectId 限制，仅受 region 限制）
    useEffect(() => {
        const loadTunnels = async () => {
            let query = supabase.from("v_tunnels_overview").select("*");
            // if (filter.region) {
            //     query = query.eq("region_name", filter.region);
            // }
            const { data, error } = await query;
            if (!error && data) {
                const tunnels = mapTunnelsRawBatch(data);
                console.log('[TunnelFilterProvider] Loaded tunnels from Supabase:', data);

                console.log('[TunnelFilterProvider] Loaded tunnels:', tunnels);

                setTunnels(tunnels);

                const derivedProjects = Array.from(
                    new Map(
                        tunnels.map((t) => [
                            t.projectShortName,
                            {
                                id: t.projectShortName,
                                name: t.projectShortName,
                                region: t.regionName,
                            },
                        ])
                    ).values()
                );
                setProjects(derivedProjects);
            }
        };
        loadTunnels();
    }, [filter.region, tunnelRefenshCount]);

    // 页面初始化时从 localStorage 恢复筛选状态
    // useEffect(() => {
    //     const saved = localStorage.getItem(FILTER_STORAGE_KEY);
    //     if (saved) {
    //         try {
    //             const parsed = JSON.parse(saved);
    //             setFilterState(parsed);
    //         } catch { }
    //     }
    // }, []);

    useEffect(() => {
        if (!tunnels.length) {
            console.log('[⏳ Waiting] tunnels not loaded yet');
            return;
        }

        const validProject = projects.find((p) => p.id === filter.projectId);
        if (!validProject) {
            console.log('[⚠️ Invalid projectId]', filter.projectId);
            const updated = { ...filter, projectId: null, tunnelId: null };
            setFilter(updated);

            return;
        }

        const validTunnel = tunnels.find((t) => t.id === filter.tunnelId);
        if (!validTunnel) {
            console.log('[⚠️ Invalid tunnelId]', filter.tunnelId);
            const updated = { ...filter, tunnelId: null };
            setFilter(updated);

        } else {
            console.log('[✅ Valid tunnelId]', filter.tunnelId);
        }
    }, [filter.region, filter.projectId, tunnels.length]);


    useEffect(() => {
        console.log('[🧭 Filter State]', filter);
    }, [filter]);

    useEffect(() => {
        console.log('[🛤️ Tunnels Loaded]', tunnels.map(t => ({ id: t.id, shortName: t.shortName })));
    }, [tunnels]);

    useEffect(() => {
        console.log('[📦 localStorage]', localStorage.getItem(FILTER_STORAGE_KEY));
    }, []);

    const tunnelIds = tunnels
        .filter((t) => !filter.projectId || t.projectId === filter.projectId)
        .map((t) => t.id);

    return (
        <TunnelFilterContext.Provider
            value={{ tunnels, tunnelIds, projects, regions, filter, setFilter, setProjects }}
        >
            {children}
        </TunnelFilterContext.Provider>
    );
}
