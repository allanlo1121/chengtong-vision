export interface ActiveConnectivityState {
  tbm_id: string;
  value: boolean;
  status: boolean;
  source: "PLC" | "DAQ" | "NETWORK";
  updated_at: string;
}

export type ConnectivityEventType = {
  topic: string;
  tbmId: string;
  paramCode: string;
  value: number;
  source: "PLC" | "DAQ" | "NETWORK";
  severity: number;
  timestamp: string;
};
