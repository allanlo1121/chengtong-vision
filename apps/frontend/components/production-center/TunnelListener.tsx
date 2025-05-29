// components/TunnelListener.tsx
'use client'

import { useEffect } from 'react'
import { supabase} from '@/utils/supabase/client'

export default function TunnelListener() {
  useEffect(() => {
    const channel = supabase.channel('tunnel_daily_progress_update')

    channel
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'tunnel_daily_progress',
        },
        (payload) => {
          console.log('📡 tunnel_daily_progress 行更新:', payload)
          // 你可以在此处理 payload.new，比如展示通知或触发业务逻辑
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('✅ 已订阅 tunnel_daily_progress 表更新')
        }
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return null
}
