"use client"

import { useWebSocket } from '@/lib/tbm/useWebSocket';

export default function TbmStatusClient() {
useWebSocket((msg: WebSocketMessage) => {
    console.log('📡 来自后端的推送:', msg);
    // 更新 state、UI 等
});

interface WebSocketMessage {
// Define the structure of the WebSocket message here
[key: string]: any;
}

  return <div>设备看板</div>;
}
