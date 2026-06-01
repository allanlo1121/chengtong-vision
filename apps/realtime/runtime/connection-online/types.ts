export type ConnectionType = "heartbeat" | "realdata";

export type ConnectionStatus = "online" | "offline";

export interface MarkOnlineInput {
  type: ConnectionType;
  tbmId: string;
  tunnelId?: string | null;
  seenAt: string;
}

export interface MarkOfflineInput {
  type: ConnectionType;
  tbmId: string;
  offlineAt: string;
}
