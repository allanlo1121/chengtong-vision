"use client";

import { useCrudForm } from "@/modules/shared/hooks/use-crud-form";
import { createOrganizationAction } from "../actions/create-organization.action";
import { CreateOrganizationSchema } from "../schemas/organization.schema";
import { CrudCreatePage } from "@/modules/shared/crud/components/crud-create-page";
import { AutoForm } from "@/modules/shared/form/auto-form";

export default function CreateOrg() {
  const form = useCrudForm({
    schema: CreateOrganizationSchema,
  });

  return (
    // <CrudCreatePage
    //     title="新建组织"
    //     schema={CreateOrganizationSchema}
    //     form={form}
    //     action={createOrganizationAction}
    // />
    <AutoForm
      schema={CreateOrganizationSchema}
      onSubmit={async (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value as any);
        });
        await createOrganizationAction(formData);
      }}
    />
  );
}
