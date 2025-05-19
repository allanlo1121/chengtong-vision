// utils/getSortedTunnels.ts
import { fetchTbmInfoByTbmcode } from "@/lib/tbm_del/data"
import { DevicePayload } from "@/utils/websocketTypes"

type Tunnel = {
    id: string
    tbmcode?: string | null
    [key: string]: any
}

function getPriorityScore(isOnline: boolean, b1: boolean, b2: boolean): number {
    if (!isOnline) return 0
    if (b1 && !b2) return 3 // 推进
    if (!b1 && b2) return 2 // 拼装
    if (b1 && b2) return 1  // 其他
    return 0
}

export function getSortedTunnelsByStatus<T extends Tunnel>(
    tunnels: T[],
    latestData: Record<string, DevicePayload>
): (T & { realtime: DevicePayload | {}; hasRealtime: boolean })[] {
    return [...tunnels]
        .map((tunnel) => {
            const { tbmcode } = tunnel;
            const hasRealtime = !!tbmcode && !!latestData[tbmcode];
            const realtime = hasRealtime ? latestData[tbmcode!] : {};
            return {
                ...tunnel,
                realtime,
                hasRealtime,
            }
        })
        .sort((a, b) => {
            if (!a.hasRealtime && b.hasRealtime) return 1
            if (a.hasRealtime && !b.hasRealtime) return -1
            if (!a.hasRealtime && !b.hasRealtime) return 0

            const ra = a.realtime as DevicePayload
            const rb = b.realtime as DevicePayload

            const aScore = getPriorityScore(
                ra.isPlcOnline ?? false,
                Boolean(ra.b000000001),
                Boolean(ra.b000000002)
            )
            const bScore = getPriorityScore(
                rb.isPlcOnline ?? false,
                Boolean(rb.b000000001),
                Boolean(rb.b000000002)
            )

            return bScore - aScore
        })
}


export function getSortedTunnelsByTask<T extends Tunnel>(
    tunnels: T[],
    latestData: Record<string, DevicePayload>
): (T & { realtime: DevicePayload | {}; hasRealtime: boolean })[] {


    return [...tunnels]
        .map((tunnel) => {
            const { tbmcode } = tunnel;
            const hasRealtime = !!tbmcode && !!latestData[tbmcode];
            const realtime: DevicePayload | {} = hasRealtime ? latestData[tbmcode!] : {};

            return {
                ...tunnel,
                realtime,
                hasRealtime,
            };
        })
        .sort((a, b) => {

            const ra = a.realtime as DevicePayload;
            const rb = b.realtime as DevicePayload;

            const aTotal = getExcavatedRings(a.dayRingStart, ra.s100100008) ?? -Infinity;
            const bTotal = getExcavatedRings(b.dayRingStart, rb.s100100008) ?? -Infinity;

            return bTotal - aTotal;
        });
}



// utils/numberHelpers.ts
export function safeNumber(input: unknown): number | null {
    const n = Number(input);
    return Number.isFinite(n) ? n : null;
}

export function getExcavatedRings(
    start: unknown,
    current: unknown
): number | null {
    const s = safeNumber(start);
    const c = safeNumber(current);

    if (s !== null && c !== null) {
        return c - s;
    }

    return null;
}


// 工具函数：确保环号是合法数字
function isValidRingPair(start?: number, current?: number): boolean {
    return Number.isFinite(start) && Number.isFinite(current);
}


export function getTotalExcavatedRings(
    tunnels: Tunnel[]
): number {
    return tunnels.reduce((sum, tunnel) => {
        const realtime = tunnel.realtime as DevicePayload;

        const start = safeNumber(tunnel.dayRingStart);
        const current = safeNumber(realtime?.s100100008);

        if (start !== null && current !== null) {
            return sum + (current - start);
        }

        return sum;
    }, 0);
}


export function getProgressAtTimestamp(): string {
    const now = new Date();
    const utcHour = now.getUTCHours();

    // 如果当前时间 < UTC 11 点（即北京时间19点），认为是“今天”；否则是“明天”
    const base = new Date(now);
    if (utcHour >= 11) {
        base.setUTCDate(base.getUTCDate() + 1);
    }

    base.setUTCHours(0, 0, 0, 0); // 设置为 UTC 零点

    return base.toISOString(); // e.g., "2025-05-16T00:00:00.000Z"
}

