"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ImportRowMap } from "@/modules/import/types";

import JsonUploader from "./json-uploader";
import JsonPreview from "./json-preview";

import { Button } from "@/components/ui/button";
import { ImportRow, ImportErrorRow } from "../types";
// import { handleImportData } from "@/lib/import-engine/engine/handle-import-data";
// import { importEntitiesAction } from "@/lib/import-engine/actions/import.action";
// import { importValidatorData } from "@/lib/import-engine/engine/import-validator-data";
import { ImportResultDialog } from "./import-result-dialog";
import { runImport } from "../import-orchestrator";
// import { ImportEntity } from "@/modules/import/registry/import.registry";
// import { processRow } from "../processors/pipeline";
import { handleImportData } from "../engine/handle-import-data";
import { TableEntity } from "@/lib/core/types/entity.types";

export default function ImportPage<T extends TableEntity>({ entity }: { entity: T }) {
  const router = useRouter();

  console.log("===ImportPage entity===");
  console.log("entity", entity);

  const [raws, setRaws] = useState<ImportRowMap[T][]>([]);
  const [validRows, setValidRows] = useState<ImportRow<T>[]>([]);
  const [failedRows, setFailedRows] = useState<ImportErrorRow<T>[]>([]);
  const [loading, setLoading] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  async function handleData(data: ImportRowMap[T][]) {
    setRaws(data);

    const res = await handleImportData<T>(entity, data);

    setValidRows(res.validRows); // 可插入
    setFailedRows(res.failedRows); // 不可插入（你需要新增这个 state）
  }

  async function handleImport() {
    // console.log("===handleImport===");
    // console.log("validRows", validRows);
    // console.log("failedRows", failedRows);
    // console.log("raws", raws);
    setLoading(true);
    try {
      //插入验证数据
      const result = await runImport<T>(entity, validRows);

      // console.log("result", result);

      if (!result.success) {
        alert(result.message ?? "导入失败");
        return;
      }

      // 👇 保存结果用于弹窗
      setImportResult(result.data);

      // // 👇 打开弹窗
      setDialogOpen(true);
    } catch (err: any) {
      alert(err.message);
    }
    setLoading(false);
    //设置新原始数据
  }

  function handleContinue() {
    const failedRaws = failedRows.map((f) => f.raw);

    // 重新加载失败数据
    handleData(failedRaws);

    setDialogOpen(false);
  }

  function handleBack() {
    router.push(`/system/${entity}`);
  }

  // async function handleNext() {
  // const nextIndex = currentIndex + 1;
  // if (nextIndex >= levels.length) {
  //   alert("全部导入完成");
  //   return;
  // }
  // setCurrentIndex(nextIndex);
  // const preview = await prepareLevelPreview(raws, levels[nextIndex], config);
  // setPreviewRows(preview);
  // }

  return (
    <div className="space-y-6">
      <JsonUploader onData={handleData} />

      {validRows.length > 0 && (
        <>
          <div className="text-lg font-semibold">待导入数据</div>
          <JsonPreview rows={validRows} />
        </>
      )}
      {failedRows.length > 0 && (
        <>
          <div className="text-lg font-semibold">验证未通过数据</div>
          <JsonPreview rows={failedRows} />
        </>
      )}
      <ImportResultDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onContinue={handleContinue}
        onBack={handleBack}
        result={importResult}
        failedRowsCount={failedRows.length}
      />

      <div className="flex gap-3">
        <Button onClick={handleImport} disabled={loading}>
          {loading ? "导入中..." : "导入当前数据"}
        </Button>
        {/* <Button onClick={handleNext}>下一层</Button> */}
        <Button onClick={() => router.push(`/system/${entity}`)}>返回</Button>
      </div>
    </div>
  );
}
