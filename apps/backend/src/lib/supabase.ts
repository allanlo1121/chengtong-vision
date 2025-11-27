// /**
//  * Supabase Client (Singleton)
//  * - 支持 anon key（普通操作）
//  * - 支持 service_role key（管理操作）
//  * - 自动使用 ENV.ts 中的类型安全环境变量
//  */

// import { createClient } from "@supabase/supabase-js";
// import { ENV } from "../config/env.js";
// import { logger } from "../core/logger.js";

// let supabaseAnonSingleton = null;
// let supabaseServiceSingleton = null;

// /**
//  * 普通权限客户端（用 anon key）
//  * 用于：
//  * - 查询参数定义
//  * - 获取 tunnels / tbms 元数据
//  * - 正常读取业务表
//  */
// export function getSupabase() {
//   if (!supabaseAnonSingleton) {
//     supabaseAnonSingleton = createClient(
//       ENV.SUPABASE_URL,
//       ENV.SUPABASE_ANON_KEY,
//       {
//         auth: {
//           persistSession: false
//         }
//       }
//     );
//   }
//   return supabaseAnonSingleton;
// }

// /**
//  * 后端管理员客户端（用 service_role）
//  * 用于：
//  * - 写 tbm_statuses
//  * - 写 tbm_status_history
//  * - 写 tbm_connectivity_snapshots
//  * - 写 realtime_threshold_events
//  * ⚠ 千万不要暴露到前端！
//  */
// export function getSupabaseAdmin() {
//   if (!ENV.SUPABASE_SERVICE_ROLE_KEY) {
//     throw new Error("❌ Missing SUPABASE_SERVICE_ROLE_KEY in environment");
//   }

//   if (!supabaseServiceSingleton) {
//     supabaseServiceSingleton = createClient(
//       ENV.SUPABASE_URL,
//       ENV.SUPABASE_SERVICE_ROLE_KEY,
//       {
//         auth: {
//           persistSession: false
//         }
//       }
//     );
//   }
//   return supabaseServiceSingleton;
// }

// // 测试连接
// export async function testDbConnection() {
//   logger.info("🔌 Testing Supabase DB connection...");

//   const { data, error } = await supabase.rpc("version"); // 内置 pg function
  
//   if (error) {
//     logger.error("❌ Supabase DB Connection FAILED:", error);
//     return false;
//   }

//   logger.info("✅ Supabase DB Connected OK:", data);
//   return true;
// }

// // 默认导出 anon 客户端
// export const supabase = getSupabase();
// export const supabaseAdmin = getSupabaseAdmin();
