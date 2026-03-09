"use client";

import { useRouter } from "next/navigation";
import { SchemaForm } from "@/modules/shared/form-engine/schema-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { ZodType } from "zod";
import { DefaultValues } from "react-hook-form";

type CrudFormPageProps<T> = {
  title: string;
  description?: string;
  schema: any;
  initialValues?: any;
  action?: (data: T) => Promise<any>;
};

export function CrudFormPage<T>({
  title,
  description,
  schema,
  initialValues,
  action,
}: CrudFormPageProps<T>) {
  const router = useRouter();

  console.log("CrudFormPage", schema);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>

        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent>
        <SchemaForm
          schema={schema}
          initialValues={initialValues as DefaultValues<T>}
          onSuccess={() => {
            router.push("/system/organizations");
          }}
          onCancel={() => {
            router.back();
          }}
        />
      </CardContent>
    </Card>
  );
}
