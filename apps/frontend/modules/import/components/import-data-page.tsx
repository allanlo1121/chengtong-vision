"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { computeLevelFromImportRow } from "../engine/compute-level";
import { prepareLevelPreview } from "../engine/prepare-preview";
import { importLevel } from "../engine/import-level";
import { TableName } from "@/modules/shared/types";

import JsonUploader from "./json-uploader";
import JsonPreview from "./json-preview";

import { Button } from "@/components/ui/button";
import { ImportConfig } from "@/modules/import/types";

export default function ImportPage<T extends TableName>({ config }: { config: ImportConfig<T> }) {
  const router = useRouter();

  const [raws, setRaws] = useState<any[]>([]);
  const [levels, setLevels] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [previewRows, setPreviewRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const currentLevel = levels[currentIndex];

  async function handleData(data: any[]) {
    setRaws(data);

    const rowsWithLevel = data.map((row) => ({
      row,
      level: computeLevelFromImportRow(row),
    }));

    const levels = [...new Set(rowsWithLevel.map((r) => r.level))].sort((a, b) => a - b);

    setLevels(levels);
    setCurrentIndex(0);

    const preview = await prepareLevelPreview(data, levels[0], config);

    setPreviewRows(preview);
  }

  async function handleImport() {
    setLoading(true);
    try {
      const result = await importLevel(config.entity, raws, previewRows);

      alert(`
新增: ${result.inserted}
更新: ${result.updated}
跳过: ${result.skipped}
`);
    } catch (err: any) {
      alert(err.message);
    }
    setLoading(false);
  }

  async function handleNext() {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= levels.length) {
      alert("全部导入完成");
      return;
    }
    setCurrentIndex(nextIndex);
    const preview = await prepareLevelPreview(raws, levels[nextIndex], config);
    setPreviewRows(preview);
  }

  return (
    <div className="space-y-6">
      <JsonUploader onData={handleData} />

      {previewRows.length > 0 && (
        <>
          <div className="text-lg font-semibold">导入预览 (第 {currentLevel} 层)</div>
          <JsonPreview rows={previewRows} />
        </>
      )}

      {previewRows.length > 0 && (
        <div className="flex gap-3">
          <Button onClick={handleImport} disabled={loading}>
            {loading ? "导入中..." : "导入当前层"}
          </Button>
          <Button onClick={handleNext}>下一层</Button>
          <Button onClick={() => router.push(`/system/${config.entity}`)}>返回</Button>
        </div>
      )}
    </div>
  );
}
