import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function saveData(topic, payload) {
  try {
    const { tbmcode, timestamp, ...rest } = payload;

    if (!tbmcode || !timestamp) {
      console.warn("⚠️ Missing proj_id, tbmcode or timestamp in payload");
      return;
    }

    //  console.log("🕒 插入前 timestamp 类型:", typeof timestamp, timestamp);

    const { error } = await supabase.from("tbm_data").insert([
      {
        id: crypto.randomUUID(),
        tbmcode,
        timestamp,
        data: rest, // 存剩下所有参数
      },
    ]);

    if (error) throw error;
  } catch (err) {
    console.error("❌ Supabase 插入失败:", err);
  }
}

// 保存设备最新状态 (device_status表)
export const saveDeviceStatus = async ({ tbmcode, isOnline, timestamp }) => {

  // 更新当前最新状态
  const { error: statusError } = await supabase.from("device_status").upsert(
    {
      tbmcode,
      is_online: isOnline,
      last_seen: new Date(timestamp).toISOString(),
    },
    {
      onConflict: "tbmcode",
    }
  );

  if (statusError) {
    console.error("❌ Supabase 更新最新设备状态失败:", statusError);
  }

  // 查询上一条日志记录
  const { data: lastLog, error: fetchError } = await supabase
    .from("device_status_logs")
    .select("is_online")
    .eq("tbmcode", tbmcode)
    .order("timestamp", { ascending: false })
    .limit(1);

  if (fetchError) {
    console.error("❌ 查询状态日志失败:", fetchError);
    return;
  }

  const lastStatus = lastLog?.[0]?.is_online;

  // 状态变化时才插入日志
  if (lastStatus !== isOnline) {
    const { error: logError } = await supabase
      .from("device_status_logs")
      .insert({
        tbmcode,
        is_online: isOnline,
        timestamp,
      });

    if (logError) {
      console.error("❌ Supabase 插入设备状态日志失败:", logError);
    }
  }
};

// 标记设备离线（也要记录日志）
export const markOfflineDevices = async () => {
  const offlineTimestamp = new Date().toISOString();

  // 查出需标记为离线的设备
  const { data: devicesToOffline, error: selectError } = await supabase
    .from("device_status")
    .select(" tbmcode")
    .lt("last_seen", new Date(Date.now() - 90 * 1000).toISOString())
    .neq("is_online", false);

  if (selectError) {
    console.error("❌ 查询离线设备失败:", selectError);
    return;
  }

  if (devicesToOffline.length === 0) return;

  // 批量更新状态为offline
  const { error: updateError } = await supabase
    .from("device_status")
    .update({ is_online: false, last_seen: offlineTimestamp })
    .in(
      "tbmcode",
      devicesToOffline.map((d) => d.tbmcode)
    );

  if (updateError) {
    console.error("❌ Supabase 标记离线设备失败:", updateError);
    return;
  }

  // 批量插入日志记录
  const logs = devicesToOffline.map((device) => ({
    tbmcode: device.tbmcode,
    is_online: false,
    timestamp: offlineTimestamp,
  }));

  const { error: logsError } = await supabase
    .from("device_status_logs")
    .insert(logs);

  if (logsError) {
    console.error("❌ Supabase 插入离线设备日志失败:", logsError);
  }
};
