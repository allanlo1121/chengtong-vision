import * as XLSX from "xlsx";

import { ImportTbmPlcTagInput } from "@/lib/domain/tbm-runtime/schemas";

export async function parseCsvFile(file: File): Promise<ImportTbmPlcTagInput[]> {
  const buffer = await file.arrayBuffer();

  const workbook = XLSX.read(buffer);

  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const data = XLSX.utils.sheet_to_json<Record<string, any>>(sheet);

  return data.map((row, index) => ({
    tagName: row["TagName"],

    dataType: row["DataType"],

    unit: row["Unit"],

    archive: row["Archive"] === "是",

    comment: row["Comment"],

    internal: row["Internal"],

    bit: row["Bit"],

    sortOrder: index + 1,
  }));
}
