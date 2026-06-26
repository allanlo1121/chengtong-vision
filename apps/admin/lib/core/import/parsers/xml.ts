import { XMLParser } from "fast-xml-parser";

export async function parseXmlFile<T>(file: File): Promise<T[]> {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
  });

  const text = await file.text();

  const xml = parser.parse(text);

  const items = xml.HmiOPCItems.OPCItems.OPCItem;

  return items.map((item: any, index: number) => ({
    tagName: item["#text"],

    dataType: item.DataType,

    archiveEnabled: item.Archive === "true",

    comment: item.Comment,

    displayOrder: index + 1,
  }));
}
