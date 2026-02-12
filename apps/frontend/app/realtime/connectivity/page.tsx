"use client";

import { columns } from "@frontend/components/tbmConnectivitys/TbmConnectivityTable/columns";
import { DataTable } from "@frontend/components/tbmConnectivitys/TbmConnectivityTable/TbmConnectivityTable";
import { useTbmConnectivityRealtime } from "@frontend/hooks/useTbmConnectivityRealtime";

import React from "react";

export default function page() {
  const { data, loading } = useTbmConnectivityRealtime();
  console.log("tbm-con data", data);

  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
