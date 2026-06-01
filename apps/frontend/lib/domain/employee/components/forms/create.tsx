"use client";

import { createEmployeeAction } from "../../actions";
import { CreateEmployeeSchema } from "../../schemas";
import { CrudFormPage } from "@/lib/shared/crud/components/crud-form-page";
import { routes } from "@/lib/core/router/router";

type Props = {
  title: string;
  description: string;
  parentId?: string;
};

export function CreateEmployee({ title, description, parentId }: Props) {
  return (
    <CrudFormPage
      title={title}
      description={description}
      schema={CreateEmployeeSchema}
      action={createEmployeeAction}
      redirect={routes.employees.list}
    />
  );
}
