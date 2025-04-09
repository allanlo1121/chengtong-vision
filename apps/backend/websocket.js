// apps/backend/websocket.js
import { WebSocketServer } from "ws";

let wss = null;

export function initWebSocket(server) {
  // console.log("✅ Received server:", server); // Debugging line
  if (!server) {
    console.error("❌ No server provided for WebSocket initialization.");
    return;
  }
  wss = new WebSocketServer({ server });
  console.log("✅ WebSocket server started");

  wss.on("connection", (ws) => {
    console.log("🧩 Client connected");

    ws.on("close", () => {
      console.log("❌ Client disconnected");
    });
  });
}

export function broadcast(data) {
  // Debugging lin

  if (!wss) return;
 // console.log("📡 Broadcasting data:", wss.clients);
  const message = JSON.stringify(data);
  wss.clients.forEach((client) => {
    // console.log("📡 Broadcasting to client:", client); // Debugging line
    if (client.readyState === 1) {
    //  console.log("📡 Sent message to client:", message);
      client.send(message);
    }
  });
}
