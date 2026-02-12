// src/modules/connectivity/ConnectivityEventRenderer.ts
import { BaseEventRenderer } from "./BaseEventRenderer.js";
import type { ConnectivityEventType } from "../../modules/connectivity/connectivity.types.js";

export class ConnectivityEventRenderer extends BaseEventRenderer<ConnectivityEventType> {
  async renderContent(event: ConnectivityEventType): Promise<string[]> {
    const lines: string[] = [];

    lines.push(`> **来源：** ${event.source}`);
    lines.push(`> **状态：** ${event.value ? "在线" : "离线"}`);

    return lines;
  }
}
