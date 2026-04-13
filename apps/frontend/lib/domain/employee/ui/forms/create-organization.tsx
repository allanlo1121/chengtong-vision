"use client";

import { createEmployeeAction } from "@/modules/employee/actions";
import { CreateEmployeeSchema } from "@/modules/employee/schemas";
import { CrudFormPage } from "@/modules/shared/crud/components/crud-form-page";

type Props = {
  title: string;
  description: string;
  parentId?: string;
};

export default function CreateEmployee({ title, description, parentId }: Props) {
  return (
    <CrudFormPage
      title={title}
      description={description}
      schema={CreateEmployeeSchema}
      action={createEmployeeAction}
      initialValues={{
        parentId,
      }}
      redirect="/system/organizations"
    />
  );
}
