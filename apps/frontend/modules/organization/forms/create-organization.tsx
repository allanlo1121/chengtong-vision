"use client";

import { useCrudForm } from "@/modules/shared/hooks/use-crud-form";
import { createOrganizationAction } from "../actions/create-organization.action";
import { CreateOrganizationSchema } from "../schemas/organization.schema";
import { CrudFormPage } from "@/modules/shared/crud/components/crud-form-page";

export default function CreateOrganization({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <CrudFormPage
      title={title}
      description={description}
      schema={CreateOrganizationSchema}
      action={createOrganizationAction}
      redirect="/system/organizations"
    />
  );
}
