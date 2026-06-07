"use client";

import { updateEmployeeAction } from "@/lib/domain/employee/actions/update.action";
import { UpdateEmployeeSchema } from "@/lib/domain/employee/schemas/schema";
import { CrudFormPage } from "@/lib/shared/crud/components/crud-form-page";
import { routes } from "@/lib/core/router/router";

export function UpdateEmployee({
  title,
  description,
  initialValues,
}: {
  title: string;
  description?: string;
  initialValues: any;
}) {
  console.log("UpdateEmployee", initialValues);

  return (
    <CrudFormPage
      title={title}
      description={description}
      schema={UpdateEmployeeSchema}
      initialValues={initialValues}
      action={updateEmployeeAction}
      redirect={routes.employees.list}
      meta={{}}
    />
  );
}
