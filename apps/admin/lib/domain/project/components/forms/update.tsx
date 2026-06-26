"use client";

import { updateProjectAction } from "../../actions";
import { UpdateProjectSchema } from "../../schemas/schema";
import { CrudFormPage } from "@/lib/shared/crud/components/crud-form-page";
import { routes } from "@/lib/core/router/router";

export default function UpdateProject({
  title,
  description,
  initialValues,
}: {
  title: string;
  description?: string;
  initialValues: any;
}) {
  console.log("UpdateProject", initialValues);

  return (
    <CrudFormPage
      title={title}
      description={description}
      schema={UpdateProjectSchema}
      initialValues={initialValues}
      action={updateProjectAction}
      redirect={routes.projects.list}
      meta={{}}
    />
  );
}
