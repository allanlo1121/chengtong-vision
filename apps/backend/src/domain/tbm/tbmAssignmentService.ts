// import { supabase } from "../../core/supabase/client.js";
// import { logger } from "../../core/logger.js";

// import { ensureSnapshot } from "./tbmConnectivityService.js";

// /**
//  * TBM Assignment 状态类型（保持与数据库一致）
//  */
// export type OperationStatus =
//   | "IDLE"
//   | "WORKING"
//   | "PAUSED"
//   | "MAINTENANCE"
//   | "STORED"
//   | "TRANSPORT";

// export interface TbmAssignment {
//   id: string;
//   tbm_id: string;
//   tunnel_id: string | null;
//   operation_status: OperationStatus;
//   last_ring?: number | null;
//   assigned_at: string;
//   updated_at: string;
// }

// let activeTbmIds: string[] = [];
// let lastLoadedAt = 0;

// /* =====================================================
//  * 1. Load From DB
//  * ===================================================== */
// export async function loadActiveTbmAssignments() {
//   const { data, error } = await supabase
//     .from("tbm_assignments")
//     .select("tbm_id")
//     .eq("operation_status", "WORKING");

//   if (error) {
//     logger.error("❌ Failed to load tbm_assignments:", error);
//     return;
//   }

//   activeTbmIds = data.map((x) => x.tbm_id);
//   lastLoadedAt = Date.now();

//   logger.info(`📌 Loaded Active TBMs: ${activeTbmIds.length} units`);
// }

// export function getActiveTbmIds(): string[] {
//   return activeTbmIds;
// }

// /* =====================================================
//  * 2. Realtime Subscription
//  * ===================================================== */
// export function subscribeTbmAssignments() {
//   logger.info("🔄 Subscribing to tbm_assignments changes...");

//   const channel = supabase
//     .channel("tbm_assignments_realtime")
//     .on(
//       "postgres_changes",
//       { event: "*", table: "tbm_assignments", schema: "public" },
//       async (payload) => {
//         logger.info(`📣 tbm_assignments updated → Reloading active TBMs`);
//         await loadActiveTbmAssignments();
//         // 新增/切换为 WORKING 的 TBM 也要初始化 snapshot
//         for (const tbmId of getActiveTbmIds()) {
//           await ensureSnapshot(tbmId);
//         }
//       }
//     )
//     .subscribe((status) => {
//       if (status === "SUBSCRIBED") {
//         logger.info("✅ tbm_assignments realtime subscribed");
//       } else if (status === "CHANNEL_ERROR") {
//         logger.error("❌ tbm_assignments realtime subscription error");
//       }
//     });

//   return channel;
// }

// /* =====================================================
//  * 3. Service Bootstrap
//  * ===================================================== */
// export async function initTbmAssignmentService() {
//   await loadActiveTbmAssignments();
//   // 初始化 snapshot
//   for (const tbmId of getActiveTbmIds()) {
//     await ensureSnapshot(tbmId);
//   }

//   subscribeTbmAssignments();
// }
