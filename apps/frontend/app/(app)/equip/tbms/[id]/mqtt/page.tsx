import { Metadata } from "next";

import { TbmHeaderCard } from "./TbmHeaderCard";

import { getMqttUserByTbmId } from "@/lib/domain/tbm-runtime/services";
import { fetchTbmDetailById } from "@/lib/domain/tbm/services";
import { ErrorBlock } from "@/components/common/error-block";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { Pencil, Settings } from "lucide-react";
import { TbmMqttEmptyCard } from "./_components/TbmMqttEmptyCard";
import { TbmMqttCard } from "./_components/TbmMqttCard";

export const metadata: Metadata = {
  title: "盾构-Mqtt配置",
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: tbmId } = await params;

  // console.log("===TbmMqttPage===");
  // console.log("tbmId", tbmId);

  let tbmMqtt;
  let tbmDetail;

  try {
    tbmDetail = await fetchTbmDetailById(tbmId);
    tbmMqtt = await getMqttUserByTbmId(tbmId);
  } catch (error) {
    console.error("Error fetching TBM MQTT data:", error);
    return <ErrorBlock message={error instanceof Error ? error.message : "查询失败"} />;
  }
  if (!tbmMqtt) {
    return <TbmMqttEmptyCard tbm={tbmDetail} />;
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

            {/* <TbmParameterConfigImportButton tbmId={tbmDetail.id!} />
            <TbmRealdataTableButton tbmId={tbmDetail.id!} /> */}
          </>
        }
      />

      {/* <TbmParameterConfigImportCard tbmId={tbmId} /> */}

      {/* 表格 */}

      <Suspense key={`${tbmId}`}>
        <TbmMqttCard tbm={tbmDetail} mqtt={tbmMqtt} />
      </Suspense>
    </div>
  );
}
