import dotenvFlow from "dotenv-flow";
import path from "path";
import process from "process";

import type { AppEnv } from "../models/env.js";

// --------------------------------------------------
// Load .env (development / production / local / etc.)
// --------------------------------------------------
dotenvFlow.config({
  node_env: process.env.NODE_ENV || "development",
  path: path.resolve(process.cwd()),
});

// --------------------------------------------------
// Helper functions
// --------------------------------------------------

/** ENV 必填字段 */
function requireVar(key: keyof AppEnv): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing required ENV variable: ${key}`);
  }
  return value;
}

/** ENV 可选字段 */
function optionalVar(key: keyof AppEnv): string | undefined {
  const v = process.env[key];
  return v ? v : undefined;
}

/** ENV 数字字段 */
function numberVar(key: keyof AppEnv, defaultValue?: number): number {
  const raw = process.env[key];
  if (!raw) {
    if (defaultValue !== undefined) return defaultValue;
    throw new Error(`❌ Missing required numeric ENV variable: ${key}`);
  }
  const num = Number(raw);
  if (Number.isNaN(num)) {
    throw new Error(`❌ ENV ${key} must be a number`);
  }
  return num;
}

/** ENV 布尔字段 */
function booleanVar(key: keyof AppEnv, defaultValue = false): boolean {
  const raw = process.env[key];
  if (!raw) return defaultValue;

  return raw === "true" || raw === "1" || raw === "yes";
}

// --------------------------------------------------
// Final typed ENV object
// --------------------------------------------------

export const ENV: AppEnv = {
  NODE_ENV: (process.env.NODE_ENV as AppEnv["NODE_ENV"]) || "development",

  DEBUG: booleanVar("DEBUG", false),

  PORT: numberVar("PORT", 8101),

  MQTT_BROKER_URL: requireVar("MQTT_BROKER_URL"),
  MQTT_USERNAME: optionalVar("MQTT_USERNAME"),
  MQTT_PASSWORD: optionalVar("MQTT_PASSWORD"),
  MQTT_CLIENT_ID: optionalVar("MQTT_CLIENT_ID"),

  DATABASE_URL: optionalVar("DATABASE_URL"),

  SUPABASE_URL: optionalVar("SUPABASE_URL"),
  SUPABASE_ANON_KEY: optionalVar("SUPABASE_ANON_KEY"),
  SUPABASE_SERVICE_ROLE_KEY: optionalVar("SUPABASE_SERVICE_ROLE_KEY"),
};

// --------------------------------------------------
// Startup Log (not printing sensitive info)
// --------------------------------------------------
console.log("🌱 ENV Loaded:", {
  NODE_ENV: ENV.NODE_ENV,
  DEBUG: ENV.DEBUG,
  PORT: ENV.PORT,
  MQTT_BROKER_URL: ENV.MQTT_BROKER_URL,
  SUPABASE_URL: ENV.SUPABASE_URL,
  SUPABASE_ANON_KEY: ENV.SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: ENV.SUPABASE_SERVICE_ROLE_KEY ? "✅" : "❌",
});
