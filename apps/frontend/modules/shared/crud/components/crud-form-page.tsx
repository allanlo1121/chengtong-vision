"use client";

import { useRouter } from "next/navigation";
import { SchemaForm } from "@/modules/shared/form-engine/schema-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { z, ZodObject, ZodType } from "zod";
import { DefaultValues } from "react-hook-form";
import { useFormActionHandlers } from "@/modules/shared/crud/use-form-action-handlers";

type CrudFormPageProps<TSchema extends ZodObject<any>> = {
  title: string;
  description?: string;
  schema: TSchema;
  initialValues?: DefaultValues<z.input<TSchema>>;
  action?: (data: z.output<TSchema>) => Promise<any>;
  redirect?: string;
};

export function CrudFormPage<TSchema extends ZodObject<any>>({
  title,
  description,
  schema,
  initialValues,
  action,
  redirect,
}: CrudFormPageProps<TSchema>) {
  const router = useRouter();
  const { handleSuccess, handleError, handleCancel } = useFormActionHandlers(router);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>

        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent>
        <SchemaForm
          schema={schema}
          initialValues={initialValues as DefaultValues<z.input<TSchema>>}
          action={action}
          onSuccess={(r) => handleSuccess(r, redirect)}
          onError={handleError}
          onCancel={handleCancel}
        />
      </CardContent>
    </Card>
  );
}
