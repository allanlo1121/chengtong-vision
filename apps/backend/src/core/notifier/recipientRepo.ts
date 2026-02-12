/**
 * alarmNotificationService.ts
 *
 * 职责：
 * - 根据 tbm_id & alarm_type 计算最终应该通知哪些人
 * - 来源包括：
 *     ① 项目岗位人员（默认规则）
 *     ② 专属特殊人员（项目配置）
 *     ③ 全公司级固定通知人员
 * - 依赖 tbmContextCache（避免重复 DB 查询）
 */

import { supabase } from "../../core/supabase/client.js";
import { logger } from "../../core/logger.js";

import type { Database } from "../../models/supabase.types.js";
import type { Recipient } from "../../models/notification/recipient.types.js";
import { MetadataRegistry } from "../../metadata/MetadataRegistry.js";

/* Supabase typed join row */
type PositionRow = Database["public"]["Tables"]["employee_position_history"]["Row"] & {
  employees: {
    name: string;
    phone_number: string;
  } | null;
};

/* ------------------------------------------------------------------
 * 获取通知人员主函数（入口）
 * ------------------------------------------------------------------*/

export async function getRecipientsForAlarm(
  tbmId: string,
  alarmType: string
): Promise<Recipient[]> {
  // console.log("getRecipientsForAlarm", { tbmId, alarmType });

  const ctx = await MetadataRegistry.tbmContexts.get(tbmId);
  if (!ctx) return [];

  const { project_id } = ctx;

  const resultMap = new Map<string, Recipient>();

  // ----------------------------
  // ① project_id 可能为空（null）
  // ----------------------------
  const projectRolesPromise = project_id
    ? getProjectRoleRecipients(project_id, alarmType)
    : Promise.resolve([]); // ⭐ project_id 不存在就给空数组

  // ② 特殊人员（也依赖 project_id）
  const specialUsersPromise = project_id
    ? getSpecialProjectRecipients(project_id, alarmType)
    : Promise.resolve([]);

  // ③ 全局人员永远都可以查
  const globalUsersPromise = getGlobalRecipients(alarmType);

  // 并发执行三个任务
  const [projectRoles, specialUsers, globalUsers] = await Promise.all([
    projectRolesPromise,
    specialUsersPromise,
    globalUsersPromise,
  ]);

  // 合并
  projectRoles.forEach((r) => resultMap.set(r.employee_id, r));
  specialUsers.forEach((r) => resultMap.set(r.employee_id, r));
  globalUsers.forEach((r) => resultMap.set(r.employee_id, r));

  return Array.from(resultMap.values());
}

/* ==================================================================
 * ① 获取项目岗位人员（默认规则）
 * ================================================================== */
async function getProjectRoleRecipients(
  projectId: string,
  alarmType: string
): Promise<Recipient[]> {
  try {
    // 先查岗位规则
    const { data: roles, error: roleErr } = await supabase
      .from("alarm_default_roles")
      .select("job_title_code")
      .eq("alarm_type", alarmType)
      .eq("is_enabled", true);

    if (roleErr) throw roleErr;
    if (!roles || roles.length === 0) return [];

    const jobTitles = roles.map((r) => r.job_title_code);

    const { data: positions, error: posErr } = await supabase
      .from("employee_position_history")
      .select("employee_id, employees(name, phone_number), job_title_id")
      .eq("project_id", projectId)
      .in("job_title_id", jobTitles)
      .is("valid_to", null)
      .overrideTypes<PositionRow[]>();

    if (posErr) throw posErr;
    if (!positions) return [];

    return positions
      .filter((p) => p.employees !== null)
      .map((p) => ({
        employee_id: p.employee_id,
        name: p.employees!.name,
        phone: p.employees!.phone_number,
        role: "PROJECT_ROLE" as const,
      }));
  } catch (err) {
    logger.error("❌ Error loading project role recipients:", err);
    return [];
  }
}

/* ==================================================================
 * ② 获取“特殊通知人员”（项目级 override）
 * ================================================================== */
async function getSpecialProjectRecipients(
  projectId: string,
  alarmType: string
): Promise<Recipient[]> {
  try {
    const { data, error } = await supabase
      .from("alarm_notification_special")
      .select("employee_id, employees(name, phone_number)")
      .eq("project_id", projectId)
      .eq("alarm_type", alarmType)
      .overrideTypes<PositionRow[]>();

    if (error) throw error;
    if (!data) return [];

    return data.map((s) => ({
      employee_id: s.employee_id,
      name: s.employees?.name ?? "Unknown",
      phone: s.employees?.phone_number ?? null,
      role: "SPECIAL" as const,
    }));
  } catch (err) {
    logger.error("❌ Error loading special recipients:", err);
    return [];
  }
}

/* ==================================================================
 * ③ 获取公司级固定通知人员（全局）
 * ================================================================== */
async function getGlobalRecipients(alarmType: string): Promise<Recipient[]> {
  console.log("getGlobalRecipients alarmType", alarmType);

  try {
    const { data, error } = await supabase
      .from("alarm_global_notification")
      .select("employee_id, role_code, employees(name, phone_number)")
      .eq("alarm_type", alarmType)
      .overrideTypes<PositionRow[]>();

    if (error) throw error;
    if (!data) return [];

    return data.map((g) => ({
      employee_id: g.employee_id,
      name: g.employees?.name ?? "Unknown",
      phone: g.employees?.phone_number ?? null,
      role: "GLOBAL" as const,
    }));
  } catch (err) {
    logger.error("❌ Error loading global recipients:", err);
    return [];
  }
}
