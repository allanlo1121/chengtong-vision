"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { TbmDetail } from "@/lib/domain/tbm/types";
import { SchemaForm } from "@/lib/shared/form-engine/schema-form";
import { createMqttUserAction } from "@/lib/domain/tbm-runtime/actions";
import { generateMqttInitialPassword } from "@/lib/domain/tbm-runtime/utils/password";
import { MqttUserSchema } from "@/lib/domain/tbm-runtime/schemas";
import { useFormActionHandlers } from "@/lib/shared/crud/use-form-action-handlers";
import { useRouter } from "next/dist/client/components/navigation";
import { routes } from "@/lib/core/router/router";

export function TbmMqttEmptyCard({ tbm }: { tbm: TbmDetail }) {
  const username = tbm.code!;
  const password = generateMqttInitialPassword();
  const router = useRouter();
  const { handleSuccess, handleError, handleCancel } = useFormActionHandlers(router);
  const redirect = `${routes.tbms.runtime(tbm.id!)}?mqtt`;

  const aclRules = [
    {
      permission: "allow",
      action: "publish",
      topic: `chengtong/${tbm.code!}/up/#`,
    },
    {
      permission: "allow",
      action: "subscribe",
      topic: `chengtong/${tbm.code!}/down/#`,
    },
  ];

  const initialValues = {
    tbmId: tbm.id!,
    tbmLabel: tbm.name!,
    tbmCode: tbm.code!,
    userType: "tbm",
    username,
    password,
    topicPrefix: `chengtong/${tbm.code!}`,
    isEnabled: true,
    isSuperuser: false,
    aclRules,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>初始化 MQTT 用户</CardTitle>
        <CardDescription>当前 TBM 尚未创建 MQTT 用户与 ACL 配置，请确认后初始化。</CardDescription>
      </CardHeader>

      <CardContent>
        <SchemaForm
          schema={MqttUserSchema}
          initialValues={initialValues}
          action={createMqttUserAction}
          onSuccess={(r) => handleSuccess(r, redirect)}
          onError={handleError}
          onCancel={handleCancel}
        />
      </CardContent>
    </Card>
  );
}
