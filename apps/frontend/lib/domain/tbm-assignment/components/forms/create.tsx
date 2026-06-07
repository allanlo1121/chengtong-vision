"use client";

import { createTbmAssignmentAction } from "../../actions";
import { CreateTbmAssignmentSchema } from "../../schemas";
import { CrudFormPage } from "@/lib/shared/crud/components/crud-form-page";
import { routes } from "@/lib/core/router/router";

type Props = {
  title: string;
  description: string;
  parentId?: string;
};

export function CreateTbm({ title, description, parentId }: Props) {
  return (
    <CrudFormPage
      title={title}
      description={description}
      schema={CreateTbmAssignmentSchema}
      action={createTbmAssignmentAction}
      redirect={routes.tbms.list}
      meta={{}}
    />
  );
}
