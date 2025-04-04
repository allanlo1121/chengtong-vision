import React from "react";
import { fetchSalaryPages } from "@/lib/hrm/salary-data";

export default async function salariesTable() {
  const totalPages = await fetchSalaryPages("");
  console.log("totalPages", totalPages);

  return <div className="mt-6 flow-root">table</div>;
}
