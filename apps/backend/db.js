import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

export async function saveData(topic, payload) {
  try {
    const { proj_id, tbmcode, timestamp, ...rest } = payload

    if (!proj_id || !tbmcode || !timestamp) {
      console.warn('⚠️ Missing proj_id, tbmcode or timestamp in payload')
      return
    }

    const { error } = await supabase.from('tbm_data').insert([
      {
        id: crypto.randomUUID(),
        proj_id,
        tbmcode,
        timestamp,
        data: rest // 存剩下所有参数
      }
    ])

    if (error) throw error
  } catch (err) {
    console.error('❌ Supabase 插入失败:', err)
  }
}

// 使用Supabase的upsert功能保存设备状态
// export const saveDeviceStatus = async ({ proj_id, tbmcode, status, timestamp }) => {
//     const timestamp = new Date(timestamp).toISOString()
  
//     const { error } = await supabase
//       .from('device_status')
//       .upsert({
//         proj_id,
//         tbmcode,
//         status,
//         last_seen: timestamp
//       }, {
//         onConflict: 'proj_id,tbmcode' // 指定冲突更新条件
//       })
  
//     if (error) {
//       console.error('❌ Supabase 保存设备状态失败:', error)
//     }
//   }
  
//   // 将90秒未更新的设备标记为离线
//   export const markOfflineDevices = async () => {
//     const { error } = await supabase
//       .from('device_status')
//       .update({ status: 'offline' })
//       .lt('last_seen', new Date(Date.now() - 90 * 1000).toISOString())
//       .neq('status', 'offline')
  
//     if (error) {
//       console.error('❌ Supabase 标记离线设备失败:', error)
//     }
//   }


  // 保存设备最新状态 (device_status表)
export const saveDeviceStatus = async ({ proj_id, tbmcode, status, timestamp }) => {
    const ts = new Date(timestamp).toISOString()
  
    // 更新当前最新状态表
    const { error: statusError } = await supabase
      .from('device_status')
      .upsert({
        proj_id,
        tbmcode,
        status,
        last_seen: ts
      }, {
        onConflict: 'proj_id,tbmcode'
      })
  
    if (statusError) {
      console.error('❌ Supabase 更新最新设备状态失败:', statusError)
    }
  
    // 同时插入历史状态日志表
    const { error: logError } = await supabase
      .from('device_status_logs')
      .insert({
        proj_id,
        tbmcode,
        status,
        timestamp: ts
      })
  
    if (logError) {
      console.error('❌ Supabase 插入设备历史状态日志失败:', logError)
    }
  }
  
  // 标记设备离线（也要记录日志）
  export const markOfflineDevices = async () => {
    const offlineTimestamp = new Date().toISOString()
  
    // 查出需标记为离线的设备
    const { data: devicesToOffline, error: selectError } = await supabase
      .from('device_status')
      .select('proj_id, tbmcode')
      .lt('last_seen', new Date(Date.now() - 90 * 1000).toISOString())
      .neq('status', 'offline')
  
    if (selectError) {
      console.error('❌ 查询离线设备失败:', selectError)
      return
    }
  
    if (devicesToOffline.length === 0) return;
  
    // 批量更新状态为offline
    const { error: updateError } = await supabase
      .from('device_status')
      .update({ status: 'offline', last_seen: offlineTimestamp })
      .in('tbmcode', devicesToOffline.map(d => d.tbmcode))
  
    if (updateError) {
      console.error('❌ Supabase 标记离线设备失败:', updateError)
      return
    }
  
    // 批量插入日志记录
    const logs = devicesToOffline.map(device => ({
      proj_id: device.proj_id,
      tbmcode: device.tbmcode,
      status: 'offline',
      timestamp: offlineTimestamp
    }))
  
    const { error: logsError } = await supabase
      .from('device_status_logs')
      .insert(logs)
  
    if (logsError) {
      console.error('❌ Supabase 插入离线设备日志失败:', logsError)
    }
  }
  