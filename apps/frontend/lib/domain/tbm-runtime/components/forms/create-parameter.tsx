"use client";

import { createTbmRuntimeParameterAction } from "../../actions";
import { TbmRuntimeParameterFormSchema } from "../../schemas";
import { CrudFormPage } from "@/lib/shared/crud/components/crud-form-page";
import { routes } from "@/lib/core/router/router";

type Props = {
  title: string;
  description: string;
  parentId?: string;
};

export function CreateTbmRuntimeParameter({ title, description }: Props) {
  return (
    <CrudFormPage
      title={title}
      description={description}
      schema={TbmRuntimeParameterFormSchema}
      action={createTbmRuntimeParameterAction}
      redirect={routes.tbms.list}
      meta={{}}
    />
  );
}
