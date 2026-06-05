"use client";

import { useRouter } from "next/navigation";
import { SchemaForm } from "@/lib/shared/form-engine/schema-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { z, ZodObject } from "zod";
import { DefaultValues } from "react-hook-form";
import { useFormActionHandlers } from "@/lib/shared/crud/use-form-action-handlers";
import { FormMeta } from "../../form-engine/types/field.types";

type CrudFormPageProps<TSchema extends ZodObject<any>, TMeta extends FormMeta = FormMeta> = {
  title: string;
  description?: string;
  schema: TSchema;
  initialValues?: DefaultValues<z.input<TSchema>>;
  action?: (data: z.output<TSchema>, id?: string) => Promise<any>;
  redirect?: string;
  meta: TMeta;
};

export function CrudFormPage<TSchema extends ZodObject<any>, TMeta extends FormMeta = FormMeta>({
  title,
  description,
  schema,
  initialValues,
  action,
  redirect,
  meta,
}: CrudFormPageProps<TSchema, TMeta>) {
  const router = useRouter();
  const { handleSuccess, handleError, handleCancel } = useFormActionHandlers(router);

  return (
    <Card className="w-full mx-auto max-w-4xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>

        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent>
        <SchemaForm
          schema={schema}
          initialValues={initialValues as DefaultValues<z.input<TSchema>>}
          action={action}
          meta={meta}
          onSuccess={(r) => handleSuccess(r, redirect)}
          onError={handleError}
          onCancel={handleCancel}
        />
      </CardContent>
    </Card>
  );
}
