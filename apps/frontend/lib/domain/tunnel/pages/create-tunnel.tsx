"use client";

import { createTunnelAction } from "@/lib/domain/tunnel/actions";
import { CreateTunnelFullSchema } from "../schemas";
import { CrudFormPage } from "@/lib/shared/crud/components/crud-form-page";
import { routes } from "@/lib/core/router/router";

type Props = {
  title: string;
  description: string;
  projectId?: string;
};

export default function CreateTunnel({ title, description, projectId }: Props) {
  return (
    <CrudFormPage
      title={title}
      description={description}
      schema={CreateTunnelFullSchema}
      action={createTunnelAction}
      redirect={routes.tunnels.list}
    />
  );
}
