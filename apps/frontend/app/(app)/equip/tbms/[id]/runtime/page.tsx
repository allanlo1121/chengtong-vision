// app/(system)/resource-center/tbms/[id]/runtime/page.tsx

import { notFound } from "next/navigation";

import { getTbmById } from "@/lib/domain/tbm/services";
// import { getTbmRuntimeOverview } from "@/lib/domain/tbm-runtime/services";

import { TbmHeaderCard } from "./_components/cards/TbmHeaderCard";

import TbmMqttTab from "./_components/tabs/TbmMqttTab";
import TbmParameterTab from "./_components/tabs/TbmParameterTab";
import { TbmTabs } from "./_components/TbmTabs";
import { TbmAssignmentCard } from "./_components/cards/TbmAssignmentCard";

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

  const result = await getTbmById(id);

  if (!result || !result.success || !result.data) {
    notFound();
  }

  // =========================================
  // Runtime Overview
  // =========================================
  // MQTT
  // =========================================

  return (
    <div className="flex flex-col gap-6">
      <TbmHeaderCard tbm={result.data} manufacturerName={"中国中铁"} />

      <div className="flex  border-1 border-green-500">
        <TbmTabs
          tbm={result.data}
          mqttTab={<TbmMqttTab tbm={result.data} />}
          parameterTab={<TbmParameterTab tbm={result.data} />}
          assignmentTab={<TbmAssignmentCard tbm={result.data} />}
        />
      </div>
    </div>
  );
}
