import { fetchTbmById } from "@/lib/domain/tbm/services";
// import { getTbmRuntimeOverview } from "@/lib/domain/tbm-runtime/services";

import { TbmHeaderCard } from "./_components/cards/TbmHeaderCard";

import TbmMqttTab from "./_components/tabs/TbmMqttTab";
import TbmParameterTab from "./_components/tabs/TbmParameterTab";
import { TbmTabs } from "./_components/TbmTabs";
import { ErrorBlock } from "@/components/common/error-block";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TbmRuntimePage({ params }: PageProps) {
  const { id } = await params;

  // =========================================
  // TBM
  // =========================================

  let tbm;
  try {
    tbm = await fetchTbmById(id);
  } catch (error) {
    console.error("Error fetching TBM:", error);
    return <ErrorBlock message={error instanceof Error ? error.message : "查询失败"} />;
  }

  // =========================================
  // Runtime Overview
  // =========================================
  // MQTT
  // =========================================

  return (
    <div className="flex flex-col gap-6">
      <TbmHeaderCard tbm={tbm} manufacturerName={"中国中铁"} />

      <div className="flex  border-1 border-green-500">
        <TbmTabs
          tbm={tbm}
          mqttTab={<TbmMqttTab tbm={tbm} />}
          parameterTab={<TbmParameterTab tbm={tbm} />}
        />
      </div>
    </div>
  );
}
