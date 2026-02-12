// src/modules/realdata/TBMProcessor.ts
import { ConnectivityService } from "../../modules/connectivity/connectivity.service.js";
import { RealdataParser } from "./processors/parser.js";
import { RealdataCleaner } from "./processors/cleaner.js";
import { DAQConnectivityWatcher } from "../connectivity/DAQWatcher.js";
import { RingService } from "../../modules/ring/ring.service.js";
import { AlarmPipeline } from "../../modules/alarms/AlarmPipeline.js";
import { RealdataRepo } from "./realdata.repo.js";
import { MetadataRegistry } from "@/metadata/MetadataRegistry.js";
import { logger } from "../../core/logger.js";

export class TBMProcessor {
  /**
   * 处理 TBM 的单条实时数据
   * @param raw Buffer/string/json
   */
  static async handleRealdata(raw: any) {
    console.log("handleRealdata", raw);

    let data;
    try {
      data = typeof raw === "string" ? JSON.parse(raw) : raw;
    } catch (e) {
      console.error("❌ TBM realdata JSON parse error:", e);
      return;
    }

    const tbmCode = data.tbmCode;
    const recordedAt = data.recorded_at ?? new Date().toISOString();

    if (!tbmCode) {
      console.error("❌ Missing tbmCode in realdata");
      return;
    }
    console.log("handle_realdata", tbmCode);

    // 1️ 合法性
    if (!MetadataRegistry.tbmValidator.isKnown(tbmCode)) {
      logger.warn(`Unknown tbmCode: ${tbmCode}`);
      return;
    }

    // 3️ 是否参与计算
    if (!MetadataRegistry.tbmValidator.isActive(tbmCode)) {
      logger.info(`Inactive tbmCode (skip realdata processing): ${tbmCode}`);
      return;
    }

    /* ======================================================
     * 1.DAQ 掉线 watchdog — 每次收到 realdata 就触发 touch
     * ====================================================== */
    DAQConnectivityWatcher.touch(tbmCode, recordedAt);

    /* ======================================================
     * 2. 处理 PLC / DAQ 在线状态字段
     *    （你取消 heartbeat 以后，在线状态由 realdata 内字段决定）
     * ====================================================== */

    // 1) PLC 在线状态（非常关键）
    // if ("n010000001" in data) {
    //     await ConnectivityService.handleStatusUpdate({
    //         tbmId,
    //         paramCode: "n010000001",
    //         status: Boolean(data.n010000001),
    //         source: "PLC",
    //         recordedAt
    //     });
    // }

    // 2) 采集盒（DAQ）在线状态
    // if ("n010000002" in data) {
    //     await ConnectivityService.handleStatusUpdate({
    //         tbmId,
    //         paramCode: "n010000002",
    //         status: Boolean(data.n010000002),
    //         source: "DAQ",
    //         recordedAt
    //     });
    // }

    /* ======================================================
     * 3. 解析 → 清洗 → 业务字段提取
     * ====================================================== */
    // const parsed = RealdataParser.parse(data);
    // const cleaned = RealdataCleaner.clean(parsed);

    /* ======================================================
     * 4. 环号逻辑
     * ====================================================== */
    // if ("s100100008" in cleaned) {
    //     await RingService.process(
    //         {
    //             tbmId,
    //             rawRing: cleaned.s100100008,
    //             recordedAt
    //         }
    //     );
    // }

    /* ======================================================
     * 5. 阈值报警逻辑
     * ====================================================== */
    // await AlarmPipeline.process({
    //     tbmId,
    //     payload: cleaned,
    //     recordedAt
    // });

    /* ======================================================
     * 6. 最终写入你自己的 realdata 表（可选）
     * ====================================================== */
    // await RealdataRepo.insert(tbmId, cleaned, recordedAt);

    return;
  }
}
