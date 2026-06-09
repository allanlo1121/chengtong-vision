"use client";

import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { importTbmParameterConfigsAction } from "@/lib/domain/tbm-runtime/actions";
import { parseImportFile } from "../parsers/parseImportFile";
import { resolveTbmParameterConfigRows } from "../parsers/resolveTbmParameterConfigRow";

export function TbmParameterConfigImportButton({ tbmId }: { tbmId: string }) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const result = await parseImportFile(file);

    const data = await resolveTbmParameterConfigRows(tbmId, result);

    console.log("ImportTbmParameterConfigInput", data);

    await importTbmParameterConfigsAction({
      tbmId,
      rows: data,
    });
  }

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
        导入
      </Button>

      <Input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
}
