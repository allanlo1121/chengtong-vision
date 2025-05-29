// 类型定义：原始数据来自 Supabase (snake_case)
export type SupabaseTunnelRaw = {
    id: string;
    short_name: string;
    region_name: string;
    project_id: string;
    project_short_name: string;
    status: string;
    ring_start: number;
    ring_end: number;
    op_num_start: number;
    op_num_end: number;
    current_op: number;
    current_ring: number;
    tbm_name: string;
};

// camelCase 类型，供前端使用
export type Tunnel = {
    id: string;
    shortName: string;
    regionName: string;
    projectId: string;
    projectShortName: string;
    status: string;
    ringStart: number;
    ringEnd: number;
    opNumStart: number;
    opNumEnd: number;
    currentOp: number;
    currentRing: number;
    tbmName: string;
    total: number; // 推导属性
};

export type TunnelFilterContextType = {
    tunnels: Tunnel[];
    tunnelIds: string[];
    projects: {
        id: string;
        name: string;
        region: string;
    }[];
    regions: string[];
    filter: {
        region: string | null;
        projectId: string | null;
        tunnelId: string | null;
    };
    setFilter: (filter: { region: string | null; projectId: string | null; tunnelId: string | null }) => void;
    setProjects: (projects: { id: string; name: string; region: string }[]) => void;
};

function mapStatusToLabel(status: string) {
    switch (status) {
        case "InProgress":
            return "在建";
        case "Suspended":
            return "停工";
        case "Completed":
            return "贯通";
        case "Cancelled":
            return "取消";
        case "NotStarted":
            return "未开工";
        default:
            return "未知";
    }

}

// 单个转换函数
export function mapTunnelRawToCamelCase(raw: SupabaseTunnelRaw): Tunnel {
    return {
        id: raw.id,
        shortName: raw.short_name,
        regionName: raw.region_name,
        projectId: raw.project_id,
        projectShortName: raw.project_short_name,
        status: mapStatusToLabel(raw.status),
        ringStart: raw.ring_start,
        ringEnd: raw.ring_end,
        opNumStart: raw.op_num_start,
        opNumEnd: raw.op_num_end,
        currentOp: raw.current_op,
        currentRing: raw.current_ring,
        tbmName: raw.tbm_name,
        total:
            raw.ring_end != null && raw.ring_start != null
                ? raw.ring_end - raw.ring_start
                : 0,
    };
}

// 批量转换函数
export function mapTunnelsRawBatch(rawList: SupabaseTunnelRaw[]): Tunnel[] {
    return rawList.map(mapTunnelRawToCamelCase);
}

// 项目分组映射函数（projectId -> Tunnel[]）
export function groupTunnelsByProjectId(tunnels: Tunnel[]): Record<string, Tunnel[]> {
    return tunnels.reduce((acc, tunnel) => {
        if (!acc[tunnel.projectId]) acc[tunnel.projectId] = [];
        acc[tunnel.projectId].push(tunnel);
        return acc;
    }, {} as Record<string, Tunnel[]>);
}

// 区域分组映射函数（regionName -> Tunnel[]）
export function groupTunnelsByRegion(tunnels: Tunnel[]): Record<string, Tunnel[]> {
    return tunnels.reduce((acc, tunnel) => {
        if (!acc[tunnel.regionName]) acc[tunnel.regionName] = [];
        acc[tunnel.regionName].push(tunnel);
        return acc;
    }, {} as Record<string, Tunnel[]>);
}

// 构造通用下拉项结构（label + value）
export function toSelectOptionsFromTunnels(tunnels: Tunnel[], labelKey: keyof Tunnel = 'shortName'): { label: string; value: string }[] {
    return tunnels.map(t => ({
        label: String(t[labelKey]),
        value: t.id,
    }));
}

// 构造项目下拉选项（用于前端筛选）
export function toSelectOptionsFromProjects(projects: { id: string; name: string }[]): { label: string; value: string }[] {
    return projects.map(p => ({
        label: p.name,
        value: p.id,
    }));
}

// 区域 → 隧道树形结构（用于 Cascader）
export function buildRegionTunnelTree(tunnels: Tunnel[]): { label: string; value: string; children: { label: string; value: string }[] }[] {
    const grouped = groupTunnelsByRegion(tunnels);
    return Object.entries(grouped).map(([region, items]) => ({
        label: region,
        value: region,
        children: items.map(t => ({
            label: t.shortName,
            value: t.id,
        })),
    }));
}
