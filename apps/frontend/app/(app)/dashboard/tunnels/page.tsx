import { Metadata } from "next";
import { Suspense } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { ErrorBlock } from "@/components/common/error-block";
import { tunnelQuery } from "@/lib/domain/tunnel/queries";
import { listTunnels } from "@/lib/domain/tunnel/services";

import { TunnelListToolbar } from "@/lib/domain/tunnel/components/tunnel-list-toolbar";
import { TunnelTableClient } from "@/lib/domain/tunnel/pages/table-client";
import { getErrorMessage } from "@/lib/shared/contracts/error-codes";
import { TunnelOverviewCard } from "@/components/moitor/cards/RuntimeMetricCard";

export const metadata: Metadata = {
  title: "隧道管理",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const rawParams = await searchParams;

  const raw = tunnelQuery.parse(rawParams);

  const params = {
    ...raw,
    sortBy: raw.sortBy ?? "sortOrder",
  };

  let result;

  try {
    result = await listTunnels(params);
  } catch (error) {
    return <ErrorBlock message={getErrorMessage(error)} />;
  }

  if (!result || result.items.length === 0) {
    return <ErrorBlock message="未查询到数据" />;
  }

  const { items: tunnels } = result;

  return (
    <div className="flex h-full w-full flex-col">
      <PageHeader title="隧道管理" />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {tunnels.map((tunnel) => (
          <TunnelOverviewCard
            key={tunnel.id}
            projectName={tunnel.projectName ?? "未知项目"}
            tunnelName={tunnel.name ?? "未知隧道"}
            tbmName="未知TBM"
            currentRing={0}
            totalRing={100}
            startDate={new Date().toISOString()}
            endDate={new Date().toISOString()}
            href={`/workspace/tunnels/${tunnel.id}`}
          />
        ))}
      </div>
    </div>
  );
}
