import { parseExcelFile } from "./excel";
import { parseCsvFile } from "./csv";
import { parseXmlFile } from "./xml";

import { ImportTbmPlcTagInput } from "@/lib/domain/tbm-runtime/schemas";

export async function parseImportFile(file: File): Promise<ImportTbmPlcTagInput[]> {
  const ext = file.name.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "xlsx":
    case "xls":
      return parseExcelFile(file);

    case "csv":
      return parseCsvFile(file);

    case "xml":
      return parseXmlFile(file);

    default:
      throw new Error("不支持的文件格式");
  }
}
