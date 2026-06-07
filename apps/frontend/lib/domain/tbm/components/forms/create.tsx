"use client";

import { createTbmAction } from "../../actions";
import { CreateTbmSchema } from "../../schemas";
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
      schema={CreateTbmSchema}
      action={createTbmAction}
      redirect={routes.tbms.list}
      meta={{}}
    />
  );
}
