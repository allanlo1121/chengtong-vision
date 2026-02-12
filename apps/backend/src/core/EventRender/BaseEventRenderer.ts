// src/core/renderer/BaseEventRenderer.ts
import { MetadataRegistry } from "../../metadata/MetadataRegistry.js";
import { severityIcon } from "./RenderHelper.js";
import type { ParameterMetadata } from "../../metadata/ParameterMetadataService.js";
import type { NotificationMessage } from "../../core/eventbus/event.types.js";

export abstract class BaseEventRenderer<TEvent> {
  // ====== 标题（通用） ======
  renderTitle(tbmName: string, paramName: string, severity: number): string {
    const icon = severityIcon(severity);

    const label =
      severity === 3
        ? `紧急警告 ${icon}`
        : severity === 2
          ? `严重警告 ${icon}`
          : severity === 1
            ? `预警 ${icon}`
            : `恢复 ${icon}`;

    return `### ${tbmName}（${paramName} - ${label}）`;
  }

  // ====== 区间 + 项目信息（通用） ======
  renderBase(tbmMeta: any): string[] {
    return [
      `> **项目：** ${tbmMeta.project_short_name ?? tbmMeta.project_name ?? "未知项目"}`,
      `> **区间：** ${tbmMeta.tunnel_name ?? "未知区间"}`,
    ];
  }

  // ====== 通用取值格式化 ======
  renderValue(value: any, meta: ParameterMetadata): string {
    if (meta.unit === "bool") {
      const boolVal = value === true || value === 1 || value === "1";
      return boolVal ? (meta.true_label ?? "正常") : (meta.false_label ?? "异常");
    }

    if (typeof value === "number") {
      const formatted =
        meta.digits != null ? value.toFixed(meta.digits) : Math.floor(value).toString();

      return meta.unit ? `${formatted} ${meta.unit}` : formatted;
    }

    if (value === null || value === undefined) return "无数据";

    return meta.unit ? `${String(value)} ${meta.unit}` : String(value);
  }

  // ====== 子类必须实现：事件特有内容渲染 ======
  abstract renderContent(event: TEvent): Promise<string[]>;

  // ====== 整条消息渲染（通用骨架） ======
  async render(
    event: TEvent & { tbmId: string; severity: number; paramCode?: string }
  ): Promise<NotificationMessage> {
    const tbmMeta = await MetadataRegistry.tbmContexts.get(event.tbmId);

    // paramCode 可能不存在（connectivity 就没有）
    const parameterMeta = event.paramCode
      ? MetadataRegistry.parameterMetas.get(event.paramCode)
      : null;

    const paramName = parameterMeta?.name ?? "";
    const tbmName = tbmMeta.tbm_name ?? "未知 TBM";

    const md: string[] = [];

    // 1. 通用标题
    md.push(this.renderTitle(tbmName, paramName, event.severity));

    // 2. 基础信息（项目/区间）
    md.push(...this.renderBase(tbmMeta));

    // 3. 子类扩展内容
    const content = await this.renderContent(event);
    md.push(...content);

    return {
      title: `${tbmName} - ${paramName} - ${event.severity}`,
      content: md.join("\n"),
    };
  }
}
