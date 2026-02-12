// lib/tunnels/mapper.ts
import { Tunnel } from "@frontend/types/tunnel";
import { SupabaseTunnelRaw } from "./types";

export function mapTunnel(raw: SupabaseTunnelRaw): Tunnel {
  return {
    id: raw.id,

    tunnelName: raw.name,
    shortName: raw.short_name,
  };
}
