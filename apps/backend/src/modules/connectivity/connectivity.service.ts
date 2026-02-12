import { EventBus, publishEvent } from "../../core/eventbus/eventBus.js";
import { ConnectivitySnapshotRepo } from "./connectivitySnaphot.repo.js";
import { ActiveConnectivityRepo } from "./activeConnectivity.repo.js";
import { ConnectivityEventRenderer } from "../../core/EventRender/ConnectivityRender.js";

// 内部合并状态缓存
interface InternalConnState {
  plc: boolean | null; // PLC 掉线由 n010000001 控制
  daq: boolean | null; // 采集盒状态（可选）
  network: boolean | null; // realdata watchdog
  lastCombined: boolean | null; // 上次的总体状态
}

const internalState: Record<string, InternalConnState> = {};

export class ConnectivityService {
  /**
   * 单来源更新 — PLC / DAQ / NETWORK
   * source: "PLC" | "DAQ" | "NETWORK"
   */
  static async handleStatusUpdate({
    tbmId,
    paramCode,
    status,
    source,
    recordedAt,
  }: {
    tbmId: string;
    paramCode: string;
    status: boolean;
    source: "PLC" | "DAQ" | "NETWORK";
    recordedAt: string;
  }) {
    // 初始化状态
    const state = internalState[tbmId] ?? {
      plc: null,
      daq: null,
      network: null,
      lastCombined: null,
    };

    // 更新来源的状态
    state[source.toLowerCase() as "plc" | "daq" | "network"] = status;

    // 计算总体 Online 状态（你可以改策略）
    const overall = computeOverallOnline(state);

    // 若总体状态未变化 → 不触发事件
    if (state.lastCombined === overall) {
      internalState[tbmId] = state;
      return;
    }

    // 更新时间戳
    state.lastCombined = overall;
    internalState[tbmId] = state;

    /* ======================================================
     * 触发最终 Online/Offline 事件（一次）
     * ====================================================== */

    const eventTopic = overall ? "connectivity/online" : "connectivity/offline";

    const eventPayload = {
      topic: "connectivity/" + (overall ? "online" : "offline"),
      tbmId,
      paramCode: "n010000001",
      value: overall ? 1 : 0,
      status: overall,
      source,
      severity: overall ? 0 : 1,
      timestamp: recordedAt,
    };
    const renderer = new ConnectivityEventRenderer();
    publishEvent(eventTopic, {
      tbmId,
      paramCode: "n010000001",
      value: overall ? 1 : 0,
      severity: overall ? 0 : 1,
      source,
      timestamp: recordedAt ?? new Date().toISOString(),
      notification: await renderer.render(eventPayload),
    });

    /* ======================================================
     * 写 Active 表（只写最终状态）
     * ====================================================== */
    await ActiveConnectivityRepo.upsert(tbmId, overall, source, recordedAt);

    /* ======================================================
     * 写 Snapshots（时间序列）
     * ====================================================== */
    await ConnectivitySnapshotRepo.writeSnapshot({
      tbmId,
      status,
      source,
      recordedAt,
    });
  }
}

/* ======================================================
 *   计算最终 Online 状态（融合策略）
 *
 *   政策说明：
 *
 *   1. PLC 掉线 → 必定离线
 *   2. NETWORK 掉线 → 必定离线
 *   3. DAQ 掉线 → 看你业务（默认不算掉线）
 *
 * ====================================================== */
function computeOverallOnline(state: InternalConnState): boolean {
  // PLC 是 TBM 主控 → 掉线必离线
  if (state.plc === false) return false;

  // DAQ（采集盒）掉线必定离线
  if (state.daq === false) return false;

  // 人工网络掉线 → 离线
  if (state.network === false) return false;

  // 默认至少 PLC 有正常数据 才算在线
  return true;
}
