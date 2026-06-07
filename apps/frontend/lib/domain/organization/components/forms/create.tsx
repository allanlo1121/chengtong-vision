"use client";

import { createOrganizationAction } from "../../actions";
import { CreateOrganizationSchema } from "../../schemas";
import { CrudFormPage } from "@/lib/shared/crud/components/crud-form-page";
import { routes } from "@/lib/core/router/router";

type Props = {
  title: string;
  description: string;
  parentId?: string;
};

export function CreateOrganization({ title, description, parentId }: Props) {
  return (
    <CrudFormPage
      title={title}
      description={description}
      schema={CreateOrganizationSchema}
      action={createOrganizationAction}
      initialValues={{
        parentId,
      }}
      redirect={routes.organizations.list}
      meta={{}}
    />
  );
}
