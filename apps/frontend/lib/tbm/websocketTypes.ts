export interface DevicePayload {
    proj_id: number;
    tbm_id: number;
    timestamp: number;
    [key: `s${string}` | `b${string}`]: number;
  }

  export interface WebSocketMessage {
    topic: string;
    payload: DevicePayload;
  }