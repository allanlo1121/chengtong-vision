"use client";

import { updateTunnelAction } from "@/lib/domain/tunnel/actions/update.action";
import { UpdateTunnelSchema } from "@/lib/domain/tunnel/schemas/";
import { CrudFormPage } from "@/lib/shared/crud/components/crud-form-page";
import { routes } from "@/lib/core/router/router";
import { Form } from "radix-ui";
import { FormMeta } from "@/lib/shared/form-engine/types/field.types";

export function UpdateTunnel({
  title,
  description,
  initialValues,
  meta,
}: {
  title: string;
  description?: string;
  initialValues: any;
  meta: FormMeta;
}) {
  console.log("UpdateTunnel", initialValues);

  return (
    <CrudFormPage
      title={title}
      description={description}
      schema={UpdateTunnelSchema}
      initialValues={initialValues}
      action={updateTunnelAction}
      redirect={routes.tunnels.list}
      meta={meta}
    />
  );
}
