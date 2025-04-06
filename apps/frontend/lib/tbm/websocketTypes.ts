export interface DevicePayload {
    proj_id: number;
    tbmcode: string;
    timestamp: number;
    [key: `s${string}` | `b${string}`]: number;
  }

  export interface WebSocketMessage {
    topic: string;
    payload: DevicePayload;
  }