"use client";

import { startTransition } from "react";
import { UseFormReturn } from "react-hook-form";
import { ZodObject } from "zod";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { SchemaForm } from "@/modules/shared/form/schema-form";

type CrudCreatePageProps = {
  title: string;
  schema: ZodObject<any>;
  form: UseFormReturn<any>;
  action: (formData: FormData) => Promise<any>;
};

export function CrudCreatePage({ title, schema, form, action }: CrudCreatePageProps) {
  const handleSubmit = form.handleSubmit(async (values) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    console.log("handleSubmit", formData, values);
    console.log("action", action);
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    await action(formData);
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent>
          <SchemaForm form={form} schema={schema} />
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            重置
          </Button>

          <Button type="submit">保存</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
