// ✅ TunnelFilterProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";
import type { Tunnel, TunnelFilterContextType } from '@/lib/mappers/mapTunnelRawToCamelCase';
import { mapTunnelsRawBatch } from '@/lib/mappers/mapTunnelRawToCamelCase';


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
    const [projectsReady, setProjectsReady] = useState(false);
    const [tunnelsReady, setTunnelsReady] = useState(false);
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
        console.log('[📝 setFilter]', next, new Date().toISOString());
        setFilterState(next);
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(FILTER_STORAGE_KEY);
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (parsed.tunnelId && parsed.tunnelId !== next.tunnelId) {
                        console.log('[♻️ 补恢复 tunnelId from localStorage]', parsed.tunnelId);
                        next.tunnelId = parsed.tunnelId;
                        return setFilterState(next);
                    }
                } catch { }
            }
            // 保存到 localStorage
            localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(next));
            console.log('[💾 Saved to localStorage]', JSON.stringify(next), new Date().toISOString());
        }
    };

    const supabase = createClient();

    useEffect(() => {
        console.log('[🔄 TunnelFilterProvider] Initializing...', filter, new Date().toISOString());

        if (filter.tunnelId) return; // 已有值，跳过

        const saved = localStorage.getItem(FILTER_STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.tunnelId) {
                    console.log('[♻️ 补恢复 tunnelId from localStorage]', parsed.tunnelId);
                    setFilter(parsed);
                }
            } catch { }
        }
    }, []);

    // ✅ 加载区域列表
    useEffect(() => {
        const loadRegions = async () => {
            const { data: regData } = await supabase.from("regions").select("name");
            if (regData) setRegions(regData.map((r) => r.name));
        };
        loadRegions();
    }, []);

    // ✅ 加载所有隧道（不受 region 限制）并派生项目（按当前 region 过滤）
    useEffect(() => {
        const loadTunnels = async () => {
            const { data, error } = await supabase.from("v_tunnels_overview").select("*");
            if (!error && data) {
                const tunnels = mapTunnelsRawBatch(data);
                console.log('[🛤️ Tunnels Loaded]', tunnels);
                setTunnels(tunnels);
                setTunnelsReady(true);

                const filtered = filter.region
                    ? tunnels.filter(t => t.regionName === filter.region)
                    : tunnels;

                const derivedProjects = Array.from(
                    new Map(
                        filtered.map((t) => [
                            t.projectShortName,
                            {
                                id: t.projectId,
                                name: t.projectShortName,
                                region: t.regionName,
                            },
                        ])
                    ).values()
                );
                console.log('[📁 Derived Projects]', derivedProjects);
                console.log('[📁 Filtered Tunnels]', filter, new Date().toISOString());

                setProjects(derivedProjects);
                setProjectsReady(true);
            }
        };
        loadTunnels();
    }, [filter.region, tunnelRefenshCount]);

    // ✅ 校验 filter 状态（仅在项目和隧道加载完后）
    useEffect(() => {
        if (!tunnelsReady || !projectsReady) {
            console.log('[⏳ Waiting] tunnels or projects not ready');
            return;
        }
        console.log('[📁 Filtered Tunnels2]', filter, new Date().toISOString());
        console.log('[🧪 Checking projectId]', filter.projectId);
        console.log('[🧪 Checking tunnelId]', projects);

        const validProject = projects.find((p) => p.id === filter.projectId);
        console.log('[🔎 Valid project found?]', validProject);
        console.log('[📋 Available projects]', projects.map(p => p.id));
        console.log('[📋 Current filter]', filter);

        if (!validProject) {
            console.log('[⚠️ Invalid projectId]', filter.projectId);
            const updated = { ...filter, projectId: null, tunnelId: null };
            setFilter(updated);
            return;
        }

        if (filter.tunnelId) {
            const validTunnel = tunnels.find((t) => t.id === filter.tunnelId);
            if (!validTunnel) {
                console.log('[⚠️ Invalid tunnelId]', filter.tunnelId);
                const updated = { ...filter, tunnelId: null };
                setFilter(updated);
            } else {
                console.log('[✅ Valid tunnelId]', filter.tunnelId);
            }
        }
    }, [tunnelsReady, projectsReady, filter.projectId]);

    const tunnelIds = tunnels
        .filter((t) => {
            if (filter.region && t.regionName !== filter.region) return false;
            if (filter.projectId && t.projectId !== filter.projectId) return false;
            return true;
        })
        .map((t) => t.id);

    return (
        <TunnelFilterContext.Provider
            value={{ tunnels, tunnelIds, projects, regions, filter, setFilter, setProjects }}
        >
            {children}
        </TunnelFilterContext.Provider>
    );
}