"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { prepareImportRows } from "../engine/prepare-import-rows";
import { persistImportRows } from "../engine/persist-import-rows";
import JsonUploader from "./json-uploader";
import JsonPreview from "./json-preview";
import { ImportConfig, ImportPreviewResult } from "../types";
import { TableName } from "@/modules/shared/types";

export default function ImportPage<T extends TableName>({ config }: { config: ImportConfig<T> }) {
  const [rows, setRows] = useState<any[]>([]);
  const [result, setResult] = useState<ImportPreviewResult<T>[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // 计算所有层级
  const levels = useMemo(() => {
    const list = result.map((r) => r.level).filter((v): v is number => typeof v === "number");
    return Array.from(new Set(list)).sort((a, b) => a - b);
  }, [result]);

  // 每层统计
  const levelStats = useMemo(() => {
    const stats: Record<number, number> = {};
    result.forEach((r) => {
      if (r.level !== undefined) {
        stats[r.level] = (stats[r.level] ?? 0) + 1;
      }
    });
    return stats;
  }, [result]);

  async function handleData(data: any[]) {
    setRows(data);
    const res = await prepareImportRows<T>(data, config);
    setResult(res);
  }

  async function handleImport() {
    if (!result?.length) return;
    let importRows = result;
    if (selectedLevel !== null) {
      importRows = result.filter((r) => r.level === selectedLevel);
    }

    // 只导入成功行
    importRows = importRows.filter((r) => r.success);
    if (!importRows.length) {
      alert("没有可导入的数据");
      return;
    }

    setLoading(true);
    const res = await persistImportRows<T>(
      config.entity,
      importRows.map((r) => r.row)
    );
    setLoading(false);
    if (!res.success) {
      alert(res.message ?? "导入失败");
      return;
    }

    const { inserted, updated, skipped, errors } = res.data;

    let message = `
导入完成

新增: ${inserted}
更新: ${updated}
跳过: ${skipped}
`;

    if (errors?.length) {
      message += `\n\n错误 ${errors.length} 条`;
    }
    alert(message);
  }

  return (
    <div className="space-y-6">
      {/* 上传 */}
      <JsonUploader onData={handleData} />

      {/* 原始数据 */}
      {rows.length > 0 && (
        <>
          <div className="text-lg font-semibold">原始数据</div>
          <JsonPreview rows={rows} />
        </>
      )}

      {/* 预览数据 */}
      {result.length > 0 && (
        <>
          <div className="text-lg font-semibold">导入预览</div>
          <JsonPreview rows={result} />
        </>
      )}

      {/* 导入按钮 */}
      <div className="flex flex-row">
        {/* 层级选择 */}
        <div className="flex items-center gap-4">
          <label className="font-medium">选择导入层级</label>

          <select
            className="border rounded px-2 py-1"
            value={selectedLevel ?? ""}
            onChange={(e) => setSelectedLevel(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">全部层级</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                第{level}层 ({levelStats[level] ?? 0})
              </option>
            ))}
          </select>
        </div>
        <Button onClick={handleImport} disabled={!result.length || loading}>
          {loading ? "导入中..." : "导入数据"}
        </Button>
      </div>
    </div>
  );
}
