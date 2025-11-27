// src/types/env.d.ts

export interface AppEnv {
  NODE_ENV: "development" | "production" | "test";
  DEBUG: boolean;
  PORT: number;

  MQTT_BROKER_URL: string;
  MQTT_USERNAME?: string;
  MQTT_PASSWORD?: string;
  MQTT_CLIENT_ID?: string;

  DATABASE_URL?: string;

  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
}

export interface RawEnvVars {
  [key: string]: string | undefined;
}
