import { Metadata } from "next";

import { TbmHeaderCard } from "./TbmHeaderCard";
import { TbmParameterConfigImportButton } from "./_components/TbmParameterConfigImportButton";
import { listTbmParameterConfigsByTbmId } from "@/lib/domain/tbm-runtime/services";
import { fetchTbmDetailById } from "@/lib/domain/tbm/services";
import { ErrorBlock } from "@/components/common/error-block";
import { Suspense } from "react";
import { TableClient } from "@/lib/domain/tbm-runtime/components/tbm-parameter-config/table-client";
import { tbmParameterConfigQuery } from "@/lib/domain/tbm-runtime/queries";
import { Button } from "@/components/ui/button";
import { Pencil, Settings } from "lucide-react";
import { TbmRealdataTableButton } from "./_components/TbmRealdataTableButton";

export const metadata: Metadata = {
  title: "盾构-运行参数配置",
};

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id: tbmId } = await params;

  console.log("===TbmParameterConfigPage===");
  console.log("tbmId", tbmId);

  const rawParams = tbmParameterConfigQuery.parse(await searchParams);

  const queryParams = {
    ...rawParams,
    sortBy: rawParams.sortBy ?? "sortOrder",
  };

  let tbmParameterConfig;
  let tbmDetail;

  try {
    tbmDetail = await fetchTbmDetailById(tbmId);
    tbmParameterConfig = await listTbmParameterConfigsByTbmId(tbmId, queryParams);
  } catch (error) {
    console.error("Error fetching TBM parameter configs:", error);
    return <ErrorBlock message={error instanceof Error ? error.message : "查询失败"} />;
  }

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <TbmHeaderCard
        tbm={tbmDetail}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Pencil className="size-4" />
              编辑
            </Button>

            <Button variant="outline" size="sm">
              <Settings className="size-4" />
              配置
            </Button>

            <TbmParameterConfigImportButton tbmId={tbmDetail.id!} />
            <TbmRealdataTableButton tbmId={tbmDetail.id!} />
          </>
        }
      />

      {/* <TbmParameterConfigImportCard tbmId={tbmId} /> */}

      {/* 表格 */}

      <Suspense key={`${tbmId}-${queryParams.search ?? ""}-${queryParams.page}`}>
        <TableClient
          items={tbmParameterConfig.items}
          total={tbmParameterConfig.total}
          page={queryParams.page}
          pageSize={queryParams.pageSize}
          sortBy={queryParams.sortBy}
          sortDirection={queryParams.sortDirection}
        />
      </Suspense>
    </div>
  );
}
