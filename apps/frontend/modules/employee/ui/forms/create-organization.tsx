"use client";

import { createOrganizationAction } from "@/modules/organization/actions/create-organization.action";
import { CreateOrganizationSchema } from "@/modules/organization/schemas/organization.schema";
import { CrudFormPage } from "@/modules/shared/crud/components/crud-form-page";

type Props = {
  title: string;
  description: string;
  parentId?: string;
};

export default function CreateOrganization({ title, description, parentId }: Props) {
  return (
    <CrudFormPage
      title={title}
      description={description}
      schema={CreateOrganizationSchema}
      action={createOrganizationAction}
      initialValues={{
        parentId,
      }}
      redirect="/system/organizations"
    />
  );
}
