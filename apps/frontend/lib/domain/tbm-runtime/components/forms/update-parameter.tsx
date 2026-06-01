"use client";

import { updateTbmRuntimeParameterAction } from "../../actions";
import { TbmRuntimeParameterFormSchema } from "../../schemas";
import { CrudFormPage } from "@/lib/shared/crud/components/crud-form-page";
import { routes } from "@/lib/core/router/router";

export function UpdateTbmRuntimeParameter({
  title,
  description,
  initialValues,
}: {
  title: string;
  description?: string;
  initialValues: any;
}) {
  console.log("UpdateTbmRuntimeParameter", initialValues);

  return (
    <CrudFormPage
      title={title}
      description={description}
      schema={TbmRuntimeParameterFormSchema}
      initialValues={initialValues}
      action={updateTbmRuntimeParameterAction}
      redirect={routes.tbms.list}
    />
  );
}
