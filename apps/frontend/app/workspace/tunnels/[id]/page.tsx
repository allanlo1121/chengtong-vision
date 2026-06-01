import { Metadata } from "next";
import { Suspense, use } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { ErrorBlock } from "@/components/common/error-block";
import { tunnelQuery } from "@/lib/domain/tunnel/queries";
import { listTunnels } from "@/lib/domain/tunnel/services";

import { TunnelListToolbar } from "@/lib/domain/tunnel/components/tunnel-list-toolbar";
import { TunnelTableClient } from "@/lib/domain/tunnel/pages/table-client";
import { getErrorMessage } from "@/lib/shared/contracts/error-codes";
import { TunnelOverviewCard } from "@/components/moitor/cards/RuntimeMetricCard";

import { TunnelWorkspaceHeader } from "./_components/TunnelWorkspaceHeader";

export const metadata: Metadata = {
  title: "隧道管理",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <div>Home</div>;
}
