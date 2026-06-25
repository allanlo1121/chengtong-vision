import React from "react";
import { useKpiTunnel } from "@/hooks/use-kpi-tunnel";

export default function ReportClient() {
  const { data: tunnels, loading, isLoading, error } = useKpiTunnel();

  return <div>ReportClient</div>;
}
