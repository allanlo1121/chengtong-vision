//form-engine/auto-form.tsx
"use client";
import { useEffect, useMemo, useRef } from "react";
import { useForm, useWatch, FieldValues, DefaultValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldRenderer } from "./field-renderer";
import {
  buildDependencyGraph,
  findChangedFields,
  runDependencyEngine,
} from "./engines/dependency-engine";
import { groupFieldsBySection } from "./engines/section-engine";
import { FieldDefinition } from "./types/field.types";
import { extractFields } from "./utils/extract-fields";
import { toast } from "sonner";
import { ActionResult } from "../types";

type SchemaFormProps<T extends FieldValues> = {
  schema: any;
  defaultValues?: DefaultValues<T>;
  action?: (formData: FormData) => Promise<any>;
  onSuccess?: (result: ActionResult<T>) => void;
  onError?: (result: ActionResult<T>) => void;
  onCancel?: () => void;
};

export function SchemaForm<T extends FieldValues>({
  schema,
  defaultValues,
  action,
  onSuccess,
  onError,
  onCancel,
}: SchemaFormProps<T>) {
  const fields = useMemo(() => extractFields<T>(schema), [schema]);

  console.log("fields", fields);
  console.log("defaultValues", defaultValues);

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  console.log("SchemaForm", form);

  const values = useWatch({
    control: form.control,
  }) as T;

  const graph = useMemo(() => buildDependencyGraph(fields), [fields]);

  const prevRef = useRef<T>({ ...values });

  useEffect(() => {
    const prev = prevRef.current;

    const changed = findChangedFields(prev, values);

    if (changed.length > 0) {
      runDependencyEngine(graph, changed, form);
    }

    prevRef.current = { ...values };
  }, [values, graph, form]);

  const onSubmit = async (data: T) => {
    if (!action) return;

    const formData = new FormData();

    for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    }

    const result = await action(formData);

    if (!result) return;

    if (!result.success) {
      toast.error(result.message ?? "提交失败");
      onError?.(result);

      return;
    }

    toast.success(result.message ?? "保存成功");
    onSuccess?.(result);
  };

  const sections = groupFieldsBySection(fields);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

      <div className="flex justify-end pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md border">
          取消
        </button>
        <button type="submit" className="px-4 py-2 rounded-md bg-primary text-white">
          保存
        </button>
      </div>
    </form>
  );
}
