import type { MqttClient, IClientOptions } from "mqtt";

export interface MqttMessage {
  topic: string;
  payload: any;
  raw: Buffer;
}

export interface MqttHooks {
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;

  onMessage?: (msg: MqttMessage) => void;
}

export interface MqttClientConfig {
  url: string;
  options?: IClientOptions;
  hooks?: MqttHooks;

  autoSubscribe?: string[]; // topics to auto subscribe upon connect
}

export interface IMqttWrapper {
  client: MqttClient;
  publish: (topic: string, data: any, retain?: boolean) => Promise<void>;
  subscribe: (topic: string | string[]) => Promise<void>;
  disconnect: () => Promise<void>;
}
