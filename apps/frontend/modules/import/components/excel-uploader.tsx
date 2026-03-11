"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

interface ExcelUploaderProps {
  onData: (rows: any[]) => void;
}

export default function ExcelUploader({ onData }: ExcelUploaderProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = async (file: File) => {
    setLoading(true);

    try {
      const buffer = await file.arrayBuffer();

      const workbook = XLSX.read(buffer);

      const sheetName = workbook.SheetNames[0];

      const sheet = workbook.Sheets[sheetName];

      const rows = XLSX.utils.sheet_to_json(sheet, {
        defval: "",
      });

      console.log("Excel rows:", rows);

      onData(rows);
    } catch (error) {
      console.error("Excel parse error", error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    await handleFile(file);
  };

  return (
    <div className="space-y-2">
      <input type="file" accept=".xlsx,.xls" onChange={onChange} className="block w-full text-sm" />

      {fileName && <div className="text-sm text-muted-foreground">已选择文件：{fileName}</div>}

      {loading && <div className="text-sm">正在解析 Excel...</div>}
    </div>
  );
}
