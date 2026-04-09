import { loadLookups } from "../processors/lookup-engine";
import { mapFields } from "../processors/field-mapper";
import { validateRows } from "../processors/zod-validator";
import { ImportConfig, ImportPreviewResult } from "../types";
import { TableName } from "@/modules/shared/types";
import { computeLevelFromImportRow } from "./compute-level";
import { ImportRowMap } from "../types/improt-row-map.types";
import { persistImportRows } from "./persist-import-rows";

async function handleImport<T extends TableName>(
  rows: Record<keyof ImportRowMap[T], any>[],
  config: ImportConfig<T>,
  setLoading: (loading: boolean) => void
) {
  if (!rows?.length) return;

  const rowsWithLevel = rows.map((row) => ({
    row,
    level: computeLevelFromImportRow(row),
  }));

  const levels = [...new Set(rowsWithLevel.map((r) => r.level))].sort((a, b) => a - b);

  setLoading(true);

  let totalInserted = 0;
  let totalUpdated = 0;
  let totalSkipped = 0;

  for (const level of levels) {
    const levelRows = rowsWithLevel.filter((r) => r.level === level).map((r) => r.row);

    console.log("导入 level:", level);

    // 每层重新加载 lookup
    const lookupMaps = await loadLookups(config.lookups);

    // 每层重新 mapFields
    const mappedRows = levelRows.map((row) =>
      mapFields(row, config.fields, config.lookups, lookupMaps, config.extraFields ?? {})
    );

    // 每层重新 validate
    const validated = validateRows(mappedRows, config.schema);

    const successRows = validated.filter((v) => v.success).map((v) => v.row);

    if (!successRows.length) continue;

    const res = await persistImportRows<T>(config.entity, successRows);

    if (!res.success) {
      setLoading(false);
      alert(res.message ?? `Level ${level} 导入失败`);
      return;
    }

    const { inserted, updated, skipped } = res.data;

    totalInserted += inserted;
    totalUpdated += updated;
    totalSkipped += skipped;
  }

  setLoading(false);

  alert(`
导入完成

新增: ${totalInserted}
更新: ${totalUpdated}
跳过: ${totalSkipped}
`);
}
