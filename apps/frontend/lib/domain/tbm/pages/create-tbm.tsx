"use client";

import { createTbmAction } from "@/lib/domain/tbm/actions";
import { CreateTbmSchema } from "../schemas";
import { CrudFormPage } from "@/lib/shared/crud/components/crud-form-page";
import { routes } from "@/lib/core/router/router";

type Props = {
  title: string;
  description: string;
  projectId?: string;
};

export default function CreateTbm({ title, description, projectId }: Props) {
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
