"use client";

import { updateTbmAction } from "@/lib/domain/tbm/actions/update.action";
import { UpdateTbmSchema } from "@/lib/domain/tbm/schemas/schema";
import { CrudFormPage } from "@/lib/shared/crud/components/crud-form-page";
import { routes } from "@/lib/core/router/router";

export function UpdateTbm({
  title,
  description,
  initialValues,
}: {
  title: string;
  description?: string;
  initialValues: any;
}) {
  console.log("UpdateTbm", initialValues);

  return (
    <CrudFormPage
      title={title}
      description={description}
      schema={UpdateTbmSchema}
      initialValues={initialValues}
      action={updateTbmAction}
      redirect={routes.tbms.list}
    />
  );
}
