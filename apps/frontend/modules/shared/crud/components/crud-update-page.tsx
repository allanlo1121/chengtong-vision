"use client";

import { useRouter } from "next/navigation";
import { SchemaForm } from "@/modules/shared/form-engine/schema-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { ZodType } from "zod";
import { DefaultValues } from "react-hook-form";

type CrudCreatePageProps<T> = {
  title: string;
  description?: string;
  schema: ZodType<T>;
  data: T;
  action: (data: T) => Promise<any>;
};

export function CrudCreatePage<T>({
  title,
  description,
  schema,
  data,
  action,
}: CrudCreatePageProps<T>) {
  const router = useRouter();

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>

        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent>
        <SchemaForm
          schema={schema}
          initialValues={data as DefaultValues<T>}
          action={action}
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
