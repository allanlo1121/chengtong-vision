import Papa from "papaparse";

export async function parseCsvFile(buffer: Buffer): Promise<any[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(buffer.toString("utf-8"), {
      header: true,
      skipEmptyLines: true,
      complete: (result) => resolve(result.data),
      error: (err) => reject(err),
    });
  });
}
