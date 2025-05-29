"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { createClient } from "@/utils/supabase/client";

type RegionFilter = string | null;

type FilterState = {
    projectId: string | null;
    region: RegionFilter;
};

type Tunnel = {
    id: string;
    short_name: string;
    region_name: string;
    status: string;
    project_short_name: string;
    ring_start: number;
    ring_end: number;
    total: number;
    op_num_start: number;
    op_num_end: number;
    current_op: number;
    current_ring: number;
    tbm_name: string;
};

type Project = {
    id: string;
    name: string;
};

type TunnelFilterContextType = {
    tunnels: Tunnel[];
    tunnelIds: string[];
    projects: Project[];
    regions: string[];
    filter: FilterState;
    setFilter: (filter: FilterState) => void;
};

const TunnelFilterContext = createContext<TunnelFilterContextType>({
    tunnels: [],
    tunnelIds: [],
    projects: [],
    regions: [],
    filter: { projectId: null, region: null },
    setFilter: () => { },
});

export function useTunnelFilter() {
    return useContext(TunnelFilterContext);
}

export function TunnelFilterProvider({ children, tunnelRefenshCount = 0 }: { children: ReactNode, tunnelRefenshCount?: number }) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [regions, setRegions] = useState<string[]>([]);
    const [tunnels, setTunnels] = useState<Tunnel[]>([]);
    const [filter, setFilter] = useState<FilterState>({
        projectId: null,
        region: null,
    });

    const supabase = createClient();

    // 加载项目 & 区域选项
    useEffect(() => {
        const loadOptions = async () => {
            const [{ data: projData }, { data: regData }] = await Promise.all([
                supabase.from("projects").select("id, name"),
                supabase.from("regions").select("name"),
            ]);

            if (projData) setProjects(projData);
            if (regData) setRegions(regData.map((r) => r.name));
        };

        loadOptions();
    }, []);

    // 根据筛选条件加载 tunnels
    useEffect(() => {
        const loadTunnels = async () => {
            let query = supabase
                .from("v_tunnels_overview")
                .select("id, short_name, region_name, project_short_name, status, ring_start, ring_end, op_num_start, op_num_end,current_op,current_ring,tbm_name");

            // if (filter.projectId) {
            //     query = query.eq("project_id", filter.projectId);
            // }
            console.log("当前筛选区域：", filter.region);

            if (filter.region) {
                query = query.eq("region_name", filter.region);
            }


            const { data, error } = await query;
            if (!error && data) {
                const withTotal = data.map(t => ({
                    ...t,
                    total: t.ring_end != null && t.ring_start != null
                        ? t.ring_end - t.ring_start
                        : 0,
                }));

                setTunnels(withTotal);
            }
        };

        loadTunnels();
    }, [filter,tunnelRefenshCount]);

    const tunnelIds = tunnels.map((t) => t.id);

    return (
        <TunnelFilterContext.Provider
            value={{ tunnels, tunnelIds, projects, regions, filter, setFilter }}
        >
            {children}
        </TunnelFilterContext.Provider>
    );
}
