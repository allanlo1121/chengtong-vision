// hooks/useExcelParser.ts

import * as XLSX from "xlsx";

export function parseExcel(file: File) {
  const reader = new FileReader();

  return new Promise<any[]>((resolve) => {
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);

      const workbook = XLSX.read(data, { type: "array" });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const rows = XLSX.utils.sheet_to_json(sheet);

      resolve(rows);
    };

    reader.readAsArrayBuffer(file);
  });
}
