
import { getParameterMetadata } from "@cache/parameterMetadataCache.js";
import { ActiveStaticState } from "@/core/alarm/types/ActiveState.js";

/** 企业微信 Markdown 的颜色样式 */
export const SeverityColors = {
    0: "info",     // green
    1: "warning",  // yellow
    2: "warning", // red
} as const;



function sortGroupMembers(members: string[]) {
    return members.slice().sort((a, b) => {
        const na = parseInt(a.replace(/\D/g, ""), 10);
        const nb = parseInt(b.replace(/\D/g, ""), 10);
        return na - nb;
    });
}

export function formatGroupEventsForDisplay({
    groupMembers,
    groupActives,
    payload
}: {
    groupMembers: string[];
    groupActives: ActiveStaticState[];
    payload: Record<string, any>;
}) {
    const severityIcon = (sev: number) => {
        if (sev === 1) return "💛";
        if (sev === 2) return "❤️";
        return "";
    };

    const qualityMark = (q: number) => {
        if (q === 1) return "*";   // 观察数据
        if (q === 2) return "**";  // 可疑数据
        return "";
    };

    const result: any[] = [];
    const sortedMembers = sortGroupMembers(groupMembers);

    for (const code of sortedMembers) {
        const meta = getParameterMetadata(code);
        const name = meta?.name ?? code;

        // ---- 1) 查 ActiveStaticState ----
        const active = groupActives.find((x) => x.param_code === code);

        if (active) {
            const sevColor = SeverityColors[active.severity as 0 | 1 | 2] || "info";
            const qMark = qualityMark(active.data_quality);

            // 静态报警 → 取 value
            const value = active.value;

            result.push({
                paramCode: code,
                paramName: name,
                severity: active.severity,
                level: active.level,
                text: ` <font color="${sevColor}">${name}: ${value}</font>${qMark ? " " + qMark : ""}`
            });

            continue;
        }

        // ---- 2) Active 没有 → 看 payload ----
        if (typeof payload[code] === "number") {
            result.push({
                paramCode: code,
                paramName: name,
                severity: 0,
                level: 0,
                text: `<font color="info">${name}: ${Math.floor(payload[code])}</font>`
            });
            continue;
        }

        // ---- 3) payload 也没有 ----
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



export function formatGroupEventsForSmsDisplay({
    groupMembers,
    groupActives,
    payload
}: {
    groupMembers: string[];
    groupActives: ActiveStaticState[];
    payload: Record<string, any>;
}) {

    const qualityMark = (q: number) => {
        if (q === 1) return "*";   // 观察数据
        if (q === 2) return "**";  // 可疑数据
        return "";
    };

    const result: any[] = [];
    const sortedMembers = sortGroupMembers(groupMembers);

    for (const code of sortedMembers) {
        const meta = getParameterMetadata(code);
        const name = meta?.name ?? code;

        // ---- 1) 查 ActiveStaticState ----
        const active = groupActives.find((x) => x.param_code === code);

        if (active) {

            const qMark = qualityMark(active.data_quality);

            // 静态报警 → 取 value
            const value = active.value;

            result.push({
                paramCode: code,
                paramName: name,
                severity: active.severity,
                level: active.level,
                text: ` ${name}: ${value}${qMark ? " " + qMark : ""}`
            });

            continue;
        }

        // ---- 2) Active 没有 → 看 payload ----
        if (typeof payload[code] === "number") {
            result.push({
                paramCode: code,
                paramName: name,
                severity: 0,
                level: 0,
                text: `${name}: ${Math.floor(payload[code])}`
            });
            continue;
        }

        // ---- 3) payload 也没有 ----
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