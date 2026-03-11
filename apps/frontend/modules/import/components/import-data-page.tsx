"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { prepareImportRows } from "../engine/prepare-import-rows";
import { persistImportRows } from "../engine/persist-import-rows";
import JsonUploader from "./json-uploader";
import JsonPreview from "./json-preview";
import { ImportConfig, ImportResult } from "../types";

export default function ImportPage<CreateOrganization>({ config }: { config: ImportConfig }) {
  const [rows, setRows] = useState<any[]>([]);
  const [result, setResult] = useState<ImportResult<CreateOrganization>[]>([]);

  async function handleData(data: any[]) {
    setRows(data);
    const res = await prepareImportRows<CreateOrganization>(data, config);
    setResult(res);
  }

  async function handleImport() {
    if (!result?.length) return;

    await persistImportRows(result, config.entity);

    alert("导入成功");
  }

  return (
    <div className="space-y-6">
      <JsonUploader onData={handleData} />

      <JsonPreview rows={rows} />

      <JsonPreview rows={result} />

      <Button onClick={handleImport} disabled={!result?.length}>
        导入数据
      </Button>
    </div>
  );
}
