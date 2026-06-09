import { XMLParser } from "fast-xml-parser";
import iconv from "iconv-lite";

import { ImportTbmPlcTagInput } from "@/lib/domain/tbm-runtime/schemas";

export async function parseXmlFile(file: File): Promise<ImportTbmPlcTagInput[]> {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
  });

  const buffer = await file.arrayBuffer();

  const header = Buffer.from(buffer).subarray(0, 200).toString("ascii");

  const match = header.match(/encoding=["']([^"']+)["']/i);

  const encoding = match?.[1]?.toLowerCase() ?? "utf-8";

  const text = iconv.decode(Buffer.from(buffer), encoding);

  const xml = parser.parse(text);

  const items = xml.HmiOPCItems.OPCItems.OPCItem;

  return items.map((item: any, index: number) => ({
    tagName: item["#text"],

    dataType: item.DataType,

    unit: item.Unit,
    archive: item.Archive === "true",

    internal: item.Internal,

    bit: item.Bit,

    comment: item.Comment,

    sortOrder: index + 1,
  }));
}
