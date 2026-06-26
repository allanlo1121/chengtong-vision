import * as XLSX from "xlsx";

import { ImportTbmParameterConfigRow } from "@/lib/domain/tbm-runtime/types";

export async function parseExcelFile(file: File): Promise<ImportTbmParameterConfigRow[]> {
  const buffer = await file.arrayBuffer();

  const workbook = XLSX.read(buffer);

  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const data = XLSX.utils.sheet_to_json<Record<string, any>>(sheet);

  return data.map((row, index) => ({
    no: row["No"] ?? index + 1,
    tagName: row["TagName"],
    parameterCode: row["ParameterCode"],
    parameterName: row["ParameterName"],
    comment: row["Comment"] ? row["Comment"] : undefined,
    scale: Number(row["Scale"] ?? 1),

    valueOffset: Number(row["ValueOffset"] ?? 0),
    customName: row["CustomName"] ? row["CustomName"] : undefined,
    customUnit: row["CustomUnit"] ? row["CustomUnit"] : undefined,
    isDisabled: Boolean(row["IsDisabled"] ?? false),
  }));
}
