// src/modules/connectivity/ConnectivityEventRenderer.ts
import { MetadataRegistry } from "../../metadata/MetadataRegistry.js";
import { AlarmEventType } from "../../modules/alarms/types/AlarmEvent.types.js";
import { BaseEventRenderer } from "./BaseEventRenderer.js";
import { AlarmResult } from "../../modules/alarms/types/AlarmContext.js";
import { trendArrow } from "./RenderHelper.js";

export class AlarmEventRenderer extends BaseEventRenderer<AlarmEventType> {
  // ====== 渲染单行参数 ======
  renderParamLine(alarmResult: AlarmResult): string {
    const meta = MetadataRegistry.parameterMetas.get(alarmResult.paramCode);

    if (!meta) {
      return `${alarmResult.paramCode}：${alarmResult.value}`;
    }

    const val = this.renderValue(alarmResult.value, meta);

    const arrow =
      meta.unit !== "bool" && typeof val === "number" && alarmResult.trend
        ? ` ${trendArrow(alarmResult.trend)}`
        : "";

    return `${meta.name}：${val}${arrow}`;
  }

  // ====== 渲染多参数 ======
  renderParameters(alarmResults: AlarmResult[]): string[] {
    return alarmResults.map((e) => `> **${this.renderParamLine(e)}**`);
  }

  async renderContent(event: AlarmEventType): Promise<string[]> {
    const md: string[] = [];

    if (event.memberResults?.length > 0) {
      md.push("#### 参数详情：");
      md.push(...this.renderParameters(event.memberResults));
      md.push("");
    } else {
      md.push("#### 参数详情：");
      md.push(
        `> **${this.renderParamLine({
          paramCode: event.paramCode,
          value: event.value,
          severity: event.severity,
          quality: event.quality,
          trend: event.trend,
        })}**`
      );
      md.push("");
    }

    return md;
  }
}
