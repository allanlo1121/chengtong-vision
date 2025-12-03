import { supabase } from "../core/supabase/client.js";


export interface ParameterMetadata {
    id: string;
    code: string;
    name: string;
    unit: string | null;
    digits: number | null;
    true_label: string | null;
    false_label: string | null;
    sort_order: number | null;

    group_code: string | null;
    group_name: string | null;

    subsystem_id: string | null;
    subsystem_code: string | null;
    subsystem_name: string | null;

    group_members?: string[];   // 新增：同组所有参数 code
    group_size?: number;        // 新增：成员数量    
}


export interface ParamMetaRow {
    id: string;
    code: string;
    name: string;
    unit: string | null;
    digits: number | null;
    true_label: string | null;
    false_label: string | null;
    sort_order: number | null;

    group_code: string | null;
    group_name: string | null;

    subsystem_id: string | null;

    subsystem: {
        id: string;
        code: string;
        name: string;
    } | null;
}




export class ParameterMetadataEngine {

    private metaMap = new Map<string, ParameterMetadata>();
    private lastRefreshed = 0;
    private renderPayloadFallback(code: string, payload: any): string {
        const m = this.get(code);
        const raw = payload?.[code];

        // ① 没有元数据：用 code 显示
        if (!m) {
            return `${code}：${raw ?? "—"}`;
        }

        // ② 有 metadata：用 metadata.name
        const displayName = m.name ?? code;

        // ③ 只显示值，不做 trend，也不加 unit（这是兜底模式）
        return `${displayName}：${raw ?? "—"}`;
    }

    // --------------------------------------------------------
    //  加载元数据（含 group_members 排序）
    // --------------------------------------------------------
    async load() {
        console.log("📥 [ParamMetaEngine] Loading metadata...");

        const { data, error } = await supabase
            .from("tbm_runtime_parameters")
            .select(`
                id, code, name, unit, digits,true_label, false_label, sort_order,
                group_code, group_name,
                subsystem_id,
                subsystem:tbm_subsystems ( id, code, name )
            `);

        if (error) throw error;
        if (!data || data.length === 0) return;

        this.metaMap.clear();
        const rows = data as any[];

        // ① 先写入基础 meta
        rows.forEach(row => {
            if (!row.code) return;

            this.metaMap.set(row.code, {
                id: row.id,
                code: row.code,
                name: row.name,
                unit: row.unit,
                digits: row.digits,
                true_label: row.true_label,
                false_label: row.false_label,
                sort_order: row.sort_order,

                group_code: row.group_code,
                group_name: row.group_name,

                subsystem_id: row.subsystem_id,
                subsystem_code: row.subsystem?.code ?? null,
                subsystem_name: row.subsystem?.name ?? null,

                group_members: [],
                group_size: 0
            });
        });

        // ② 构建 groupMap
        const groupMap: Record<string, string[]> = {};

        this.metaMap.forEach(meta => {
            if (!meta.group_code) return;
            if (!groupMap[meta.group_code]) groupMap[meta.group_code] = [];
            groupMap[meta.group_code].push(meta.code);
        });

        // ③ 按 sort_order 排序 group members
        Object.keys(groupMap).forEach(groupCode => {
            groupMap[groupCode].sort((aCode, bCode) => {
                const a = this.metaMap.get(aCode);
                const b = this.metaMap.get(bCode);
                return (a?.sort_order ?? 9999) - (b?.sort_order ?? 9999);
            });
        });

        // ④ 写回 group_members
        this.metaMap.forEach(meta => {
            if (!meta.group_code) return;

            const members = groupMap[meta.group_code] ?? [];
            meta.group_members = members;
            meta.group_size = members.length;
        });

        this.lastRefreshed = Date.now();
        console.log(`✅ [ParamMetaEngine] Loaded ${this.metaMap.size} parameters`);
    }

    // --------------------------------------------------------
    //  查一个 meta
    // --------------------------------------------------------
    get(paramCode: string) {
        return this.metaMap.get(paramCode);
    }

    getAll() {
        return this.metaMap;
    }

    // --------------------------------------------------------
    //  值格式化（布尔/枚举/数字）
    // --------------------------------------------------------
    renderValue(value: any, meta: ParameterMetadata): string {

        // ① 布尔值处理
        if (meta.unit === "bool") {
            const boolVal = value === true || value === 1 || value === "1";
            return boolVal
                ? (meta.true_label ?? "正常")
                : (meta.false_label ?? "异常");
        }

        // ② 数字处理（带 digits）
        if (typeof value === "number") {

            const formatted =
                meta.digits != null
                    ? value.toFixed(meta.digits)
                    : Math.floor(value).toString();

            // 单位拼接
            return meta.unit
                ? `${formatted} ${meta.unit}`
                : formatted;
        }

        // ③ fallback
        return meta.unit
            ? `${String(value)} ${meta.unit}`
            : String(value);
    }

    // --------------------------------------------------------
    // 渲染单参数（主参数）
    // --------------------------------------------------------
    renderParamLine({
        paramCode,
        value,
        trend
    }: {
        paramCode: string;
        value: any;
        trend?: string;
    }): string {

        const meta = this.get(paramCode);
        if (!meta) return `${paramCode}：${value ?? "—"}`;

        const val = this.renderValue(value, meta);

        // 箭头（可选）
        const arrow =
            meta.unit !== "bool" && trend
                ? ` ${trendArrow(trend)}`
                : "";

        return `${meta.name}：${val}${arrow}`;
    }

    // --------------------------------------------------------
    // 渲染分组列表
    // --------------------------------------------------------
    renderGroupItems({
        paramCode,
        groupActives,
        payload
    }: {
        paramCode: string;
        groupActives: any[];
        payload: any;
    }): string[] {

        const meta = this.get(paramCode);
        if (!meta?.group_members) return [];

        // active 映射表（优先使用 groupActives）
        const activeMap = new Map(
            groupActives.map((g: any) => [g.paramCode, g])
        );

        return meta.group_members.map(code => {

            const m = this.get(code);


            const active = activeMap.get(code);

            if (!m) {
                // 元数据缺失时的兜底显示                
                return `${code}：${active.value ?? "—"}`;
            }

            let text = "";
            let arrow = "";

            // ① 首选 groupActives 数据（含 trend）
            if (active) {
                text = this.renderValue(active.value, m);
                if (m?.unit !== "bool") {
                    arrow = ` ${trendArrow(active.trend)}`;
                }
            }
            else {
                // ② fallback 使用 payload 原始数据（无 trend）
                const v = payload?.[code];
                text = this.renderValue(v, m);

                if (m?.unit !== "bool" && v?.trend) {
                    arrow = ` ${trendArrow(v.trend)}`;
                }
            }

            // ③ 最终行格式（name：value →）
            const line = `${m?.name ?? code}：${text}${arrow}`;

            // ④ 主参数加粗
            if (code === paramCode) {
                return `**${line}**`;
            }

            return line;
        });
    }
}




// ===== Helper: 趋势箭头 =====
function trendArrow(trend?: string) {
    switch (trend) {
        case "up": return "↑";
        case "down": return "↓";
        default: return "→";
    }
}
