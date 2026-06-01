"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Tbm } from "@/lib/domain/tbm/types";
import { SchemaForm } from "@/lib/shared/form-engine/schema-form";
import { useFormActionHandlers } from "@/lib/shared/crud/use-form-action-handlers";
import { useRouter } from "next/dist/client/components/navigation";
import { routes } from "@/lib/core/router/router";
import { CreateTbmAssignmentFormSchema } from "@/lib/domain/tbm-runtime/schemas/tbm-assignment.schema";
import { createTbmAssignmentAction } from "@/lib/domain/tbm-runtime/actions/create-tbm-assignment.action";

export function TbmAssignmentCard({ tbm }: { tbm: Tbm }) {
  const router = useRouter();
  const { handleSuccess, handleError, handleCancel } = useFormActionHandlers(router);
  const redirect = `${routes.tbms.runtime(tbm.id)}?tab=assignment`;

  const initialValues = {
    tbmId: tbm.id,
    tbmLabel: tbm.name,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>盾构机任务分配</CardTitle>
        <CardDescription>当前 TBM 任务分配。</CardDescription>
      </CardHeader>

      <CardContent>
        <SchemaForm
          schema={CreateTbmAssignmentFormSchema}
          initialValues={initialValues}
          action={createTbmAssignmentAction}
          onSuccess={(r) => handleSuccess(r, redirect)}
          onError={handleError}
          onCancel={handleCancel}
        />
      </CardContent>
    </Card>
  );
}
