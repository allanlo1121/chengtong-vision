
// import { getParameterMetadata } from "@/cache/parameterMetadataCache.js";

// import type { EventParameterDetail } from "@core/eventbus/types";

// export function formatParamDisplay(param: EventParameterDetail) {
//     const paramMeta = getParameterMetadata(param.paramCode);
//     if (!paramMeta) return null;

//     // ① 名称（波动）
//     const displayName =
//         param.window_ms > 0
//             ? `${paramMeta.name}（波动）`
//             : paramMeta.name;

//     // ② 数值 + dataQuality 标记
//     const valueStr =
//         (Math.floor(param.value) ?? "").toString();

//     return { displayName, valueStr };
// }



import { getParameterMetadata } from "@/metadata/parameterMetadataCache.js";

export function formatParamDisplay(paramCode: string, value: any) {
    const meta = getParameterMetadata(paramCode);
    if (!meta) return null;

    // 过滤非数值
    if (value === undefined || value === null || isNaN(value)) return null;

    const name = meta.name || paramCode;
    const unit = meta.unit || "";

    // 格式化显示：整数不加小数，浮点保留一位
    const formattedValue =
        typeof value === "number"
            ? Number.isInteger(value)
                ? value.toString()
                : value.toFixed(1)
            : value.toString();

    return {
        code: paramCode,
        name,
        unit,
        value,
        displayName: name,
        valueStr: unit ? `${formattedValue} ${unit}` : formattedValue,
    };
}


export function formatGroupDisplay(
    groupMembers: string[],
    payload: Record<string, any>
) {
    const results: Record<string, string> = {};

    for (const code of groupMembers) {
        const value = payload[code];
        const formatted = formatParamDisplay(code, value);

        if (!formatted) continue;

        results[formatted.displayName] = formatted.valueStr;
    }

    return results;
}

export const SeverityColors: Record<0 | 1 | 2, string> = {
    0: "info",      // 绿色
    1: "comment",   // 灰色
    2: "warning"    // 橙红色
}

function sortGroupMembers(members: string[]) {
    return members.slice().sort((a, b) => {
        const na = parseInt(a.replace(/\D/g, ""), 10);
        const nb = parseInt(b.replace(/\D/g, ""), 10);
        return na - nb;
    });
}

export function formatGroupEventsForDisplay({
    ruleType,
    groupMembers,
    groupActives,
    payload
}: {
    ruleType: "delta" | "static";
    groupMembers: string[];
    groupActives: any[];
    payload: Record<string, any>;
}) {
    const severityIcon = (sev: number) => {
        if (sev === 1) return "💛";      // warning
        if (sev === 2) return "❤️";      // critical
        return "";
    };

    const qualityMark = (q: number) => {
        if (q === 1) return "*";         // 观察数据
        if (q === 2) return "**";        // 可疑数据
        return "";
    };

    const result: any[] = [];
    const sortedMembers = sortGroupMembers(groupMembers);

    for (const code of sortedMembers) {
        const meta = getParameterMetadata(code);
        const name = meta?.name ?? code;

        // 1) 先看 groupActives 有没有
        const active = groupActives.find((x) => x.param_code === code);

        if (active) {
            const sevIcon = severityIcon(active.severity);
            const sevColor = SeverityColors[(active.severity as 0 | 1 | 2)] || "info";
            const qMark = qualityMark(active.data_quality);

            const val =
                ruleType === "delta"
                    ? active.delta_value
                    : active.value;

            result.push({
                paramCode: code,
                paramName: name,
                severity: active.severity,
                level: active.level,
                text: ` <font color="${sevColor}">${name}:${val}</font>${qMark ? " " + qMark : ""}`
            });

            continue;
        }

        // 2) 如果 active 没有 → 去 payload 里找原始值
        const rawVal = payload[code];

        if (typeof rawVal === "number") {
            result.push({
                paramCode: code,
                paramName: name,
                severity: 0,
                level: 0,
                text: `<font color="info">${name}: ${rawVal}</font>` // ⚠ 无 sevIcon / qMark
            });

            continue;
        }

        // 3) payload 也没有 → 不显示
        result.push({
            paramCode: code,
            paramName: name,
            severity: 0,
            level: 0,
            text: `${name}: -`
        });
    }

    return result;
}
