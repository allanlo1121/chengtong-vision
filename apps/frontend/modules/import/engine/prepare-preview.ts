import { computeLevelFromImportRow } from "./compute-level";
import { mapFields } from "../processors/field-mapper";
import { validateRows } from "../processors/zod-validator";
import { loadLookups } from "../processors/lookup-engine";

export async function prepareLevelPreview(rows: any[], level: number, config: any) {
  const levelRows = rows.filter((r) => computeLevelFromImportRow(r) === level);

  const lookupMaps = await loadLookups(config.lookups);

  const mappedRows = levelRows.map((row) =>
    mapFields(row, config.fields, config.lookups, lookupMaps, config.extraFields ?? {})
  );

  const validated = validateRows(mappedRows, config.schema);

  return validated;
}
