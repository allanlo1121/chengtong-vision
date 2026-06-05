import Fastify from "fastify";

import cors from "@fastify/cors";

import { createServer } from "http";

import { createSocketServer } from "../socket/socket.server";

import "../mqtt/mqtt.client";
import { checkConnectionTimeouts } from "../runtime/connection-online/check-connection-timeouts";

import { loadTbmProgressCache } from "../runtime/tbm-progress-cache";
import { loadStatSettings } from "../runtime/stat-period";

async function bootstrap() {
  const app = Fastify();

  await app.register(cors, {
    origin: true,
  });

  app.get("/health", async () => {
    return {
      ok: true,
    };
  });

  await loadStatSettings();
  await loadTbmProgressCache();

  setInterval(() => {
    checkConnectionTimeouts().catch((error) => {
      console.error("Failed to check connection timeouts", error);
    });
  }, 30_000);

  const server = createServer(app.server);

  createSocketServer(server);

  const PORT = Number(process.env.PORT ?? 6001);

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`realtime server running :${PORT}`);
  });
}

bootstrap();
