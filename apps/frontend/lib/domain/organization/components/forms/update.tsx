"use client";

import { updateOrganizationAction } from "@/lib/domain/organization/actions/update.action";
import { UpdateOrganizationSchema } from "@/lib/domain/organization/schemas/schema";
import { CrudFormPage } from "@/lib/shared/crud/components/crud-form-page";
import { routes } from "@/lib/core/router/router";

export function UpdateOrganization({
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
      redirect={routes.organizations.list}
    />
  );
}
