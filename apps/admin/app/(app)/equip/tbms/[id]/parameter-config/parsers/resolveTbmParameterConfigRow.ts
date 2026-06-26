import { ImportTbmParameterConfigRow } from "@/lib/domain/tbm-runtime/types";
import { ImportTbmParameterConfigInput } from "@/lib/domain/tbm-runtime/schemas";
import {
  listTbmParametersByCode,
  listTbmPlcTagNames,
} from "@/lib/shared/options/repositories/client";

export async function resolveTbmParameterConfigRows(
  tbmId: string,
  rows: ImportTbmParameterConfigRow[]
): Promise<ImportTbmParameterConfigInput[]> {
  const parameterCodes = [...new Set(rows.map((r) => r.parameterCode))];

  const tagNames = [...new Set(rows.map((r) => r.tagName).filter(Boolean))];

  const parameters = await listTbmParametersByCode(parameterCodes);

  const plcTags = await listTbmPlcTagNames(tbmId, tagNames);

  const parameterMap = new Map(parameters.map((p) => [p.code, p.id]));

  const plcTagMap = new Map(plcTags.map((t) => [t.name, t.id]));

  return rows.map((row) => {
    const parameterId = parameterMap.get(row.parameterCode);

    if (!parameterId) {
      throw new Error(`未找到参数：${row.parameterCode}`);
    }

    return {
      parameterId,

      plcTagId: row.tagName ? plcTagMap.get(row.tagName) : undefined,

      scale: row.scale,

      valueOffset: row.valueOffset,

      customName: row.customName,

      customUnit: row.customUnit,

      isDisabled: row.isDisabled,
    };
  });
}
