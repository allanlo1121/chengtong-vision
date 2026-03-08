"use client";
import { useEffect, useMemo } from "react";
import { useForm, useWatch, FieldValues, DefaultValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldRenderer } from "./field-renderer";
import { runDependencyEngine } from "./engines/dependency-engine";
import { groupFieldsBySection } from "./engines/section-engine";
import { FieldDefinition } from "./types/field.types";
import { extractFields } from "./utils/extract-fields";

type AutoFormProps<T extends FieldValues> = {
  schema: any;
  defaultValues?: DefaultValues<T>;
  onSubmit?: SubmitHandler<T>;
};

export function AutoForm<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
}: AutoFormProps<T>) {
  const fields = useMemo(() => extractFields<T>(schema), [schema]);

  console.log("fields", fields);

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const values = useWatch({
    control: form.control,
  }) as T;

  useEffect(() => {
    runDependencyEngine(fields, values, form);
  }, [fields, values, form]);

  const sections = groupFieldsBySection(fields);

  return (
    <form onSubmit={form.handleSubmit(onSubmit ?? (() => {}))} className="space-y-6">
      {Array.from(sections.entries()).map(([section, sectionFields]) => (
        <div key={section} className="space-y-4">
          {section !== "default" && (
            <div className="text-lg font-semibold border-b pb-2">{section}</div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {sectionFields.map((field) => (
              <div key={field.name} className={`col-span-${field.ui.colSpan ?? 1}`}>
                <FieldRenderer<T> name={field.name} ui={field.ui} form={form} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </form>
  );
}
