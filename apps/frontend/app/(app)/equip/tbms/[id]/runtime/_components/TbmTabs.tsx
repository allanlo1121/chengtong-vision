"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tbm } from "@/lib/domain/tbm/types";
import { useSearchParams, useRouter } from "next/navigation";
import TbmMqttTab from "./tabs/TbmMqttTab";

export function TbmTabs({
  tbm,
  mqttTab,
  parameterTab,
}: {
  tbm: Tbm;
  mqttTab: React.ReactNode;
  parameterTab: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tab = searchParams.get("tab") || "overview";

  function handleTabChange(value: string) {
    const params = new URLSearchParams(searchParams);

    params.set("tab", value);

    router.replace(`?${params.toString()}`);
  }

  return (
    <Tabs className="w-full border-1 border-blue-500" value={tab} onValueChange={handleTabChange}>
      <TabsList>
        <TabsTrigger value="overview">总览</TabsTrigger>
        <TabsTrigger value="mqtt">MQTT</TabsTrigger>
        <TabsTrigger value="parameter">参数</TabsTrigger>

        <TabsTrigger value="settings">设置</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">overview</TabsContent>

      <TabsContent value="mqtt">{mqttTab}</TabsContent>

      <TabsContent value="parameter">{parameterTab}</TabsContent>
    </Tabs>
  );
}
