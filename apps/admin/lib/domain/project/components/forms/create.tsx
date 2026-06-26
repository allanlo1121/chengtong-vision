"use client";

import { createProjectAction } from "../../actions";
import { CreateProjectSchema } from "../../schemas";
import { CrudFormPage } from "@/lib/shared/crud/components/crud-form-page";
import { routes } from "@/lib/core/router/router";

type Props = {
  title: string;
  description: string;
  projectId?: string;
};

export default function CreateProject({ title, description, projectId }: Props) {
  return (
    <CrudFormPage
      title={title}
      description={description}
      schema={CreateProjectSchema}
      action={createProjectAction}
      redirect={routes.projects.list}
      meta={{}}
    />
  );
}
