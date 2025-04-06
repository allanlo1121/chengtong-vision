"use client"

import { useWebSocket } from '@/lib/tbm/useWebSocket';
import { WebSocketMessage } from '@/lib/tbm/websocketTypes';

export default function TbmStatusClient() {
useWebSocket((msg: WebSocketMessage) => {
    console.log('📡 来自后端的推送:', msg);
    // 更新 state、UI 等
});


  return <div>设备看板</div>;
}
