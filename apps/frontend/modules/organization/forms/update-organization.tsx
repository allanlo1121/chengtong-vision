"use client";

import { useCrudForm } from "@/modules/shared/hooks/use-crud-form";
import { updateOrganizationAction } from "../actions/update-organization.action";
import { UpdateOrganizationSchema } from "../schemas/organization.schema";
import { CrudFormPage } from "@/modules/shared/crud/components/crud-form-page";

export default function UpdateOrganization({
  title,
  description,
  initialValues,
}: {
  title: string;
  description?: string;
  initialValues: any;
}) {
  console.log("UpdateOrganization", initialValues);

  return (
    <CrudFormPage
      title={title}
      description={description}
      schema={UpdateOrganizationSchema}
      initialValues={initialValues}
      action={updateOrganizationAction}
    />
  );
}
