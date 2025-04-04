// apps/backend/websocket.js
import { WebSocketServer } from 'ws'

let wss = null

export function initWebSocket(server) {
  wss = new WebSocketServer({ server })
  console.log('✅ WebSocket server started')

  wss.on('connection', (ws) => {
    console.log('🧩 Client connected')

    ws.on('close', () => {
      console.log('❌ Client disconnected')
    })
  })
}

export function broadcast(data) {
  if (!wss) return
  const message = JSON.stringify(data)
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(message)
    }
  })
}
