export interface DevicePayload {
    tbmcode: string;
    isPlcOnline: boolean;
    timestamp: string;
    [key: `s${string}` | `b${string}`]: number;
  }

  export interface WebSocketMessage {
    topic: string;
    payload: DevicePayload;
  }