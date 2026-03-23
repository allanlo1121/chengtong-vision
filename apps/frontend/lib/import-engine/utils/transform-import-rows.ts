// utils/transformImportRows.ts

export function transformRows(
  rows: any[],
  lookups: {
    regionMap: Map<string, string>;
    projectTypeMap: Map<string, string>;
  }
) {
  return rows.map((row, index) => ({
    __row: index + 2,

    name: row["项目名称"],

    regionId: lookups.regionMap.get(row["所属片区"]),

    projectTypeId: lookups.projectTypeMap.get(row["项目类型"]),
  }));
}
