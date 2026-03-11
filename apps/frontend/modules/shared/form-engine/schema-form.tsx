// form-engine/schema-form.tsx
"use client";

import { useEffect, useMemo, useRef } from "react";
import { useForm, useWatch, FieldValues, DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FieldRenderer } from "./field-renderer";
import { buildDependencyGraph } from "./engines/dependency-engine";
import { useDependencyEngine } from "./hooks/use-dependency-engine";
import { groupFieldsBySection } from "./engines/section-engine";

import { extractFields } from "./utils/extract-fields";
import { ActionResult } from "../types";
import { DependencyGraph } from "./types/dependency-graph";

import { z, ZodObject, ZodRawShape, ZodType, ZodSchema } from "zod";
import { log } from "console";
import { de } from "zod/v4/locales";

type SchemaFormProps<TSchema extends ZodObject<any>> = {
  schema: TSchema;
  initialValues?: DefaultValues<z.input<TSchema>>;
  action?: (data: z.output<TSchema>) => Promise<ActionResult<any>>;
  onSuccess?: (result: ActionResult<z.output<TSchema>>) => void;
  onError?: (result: ActionResult<z.output<TSchema>>) => void;
  onCancel?: () => void;
};

export function SchemaForm<TSchema extends ZodObject<any>>({
  schema,
  initialValues,
  action,
  onSuccess,
  onError,
  onCancel,
}: SchemaFormProps<TSchema>) {
  // console.log("SchemaForm props", {
  //   schema,
  //   initialValues,
  //   action,
  //   onSuccess,
  //   onError,
  //   onCancel,
  // });
  /** ------------------------------------------------
   * 1 提取字段
   * ------------------------------------------------ */
  const fields = useMemo(() => extractFields<TSchema>(schema), [schema]);

  type FormInput = z.input<TSchema>;
  type FormOutput = z.output<TSchema>;

  // console.log("Schema fields", fields);

  /** ------------------------------------------------
   * 2 初始化 form
   * ------------------------------------------------ */

  const schemaDefaults = useMemo(() => {
    const shape = schema.shape;
    const defaults: Record<string, undefined> = {};
    for (const key in shape) {
      const field: any = shape[key];
      // console.log("Calculating schema default for field", { key, field });
      const defaultValue = field._def.defaultValue;
      if (defaultValue === undefined) {
        // console.log(`No default value for field ${key}:`);
        continue;
      }
      defaults[key] = defaultValue;
    }

    try {
      return defaults;
    } catch {
      return {};
    }
  }, [schema]);

  const defaultValues = useMemo(() => {
    return {
      ...schemaDefaults,
      ...initialValues,
    } as DefaultValues<FormInput>;
  }, [schemaDefaults, initialValues]);

  // console.log("SchemaForm defaultValues", defaultValues);

  const form = useForm<FormInput, any, FormOutput>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  // console.log("schemaForm form", form);

  /** ------------------------------------------------
   * 3 initialValues 更新
   * ------------------------------------------------ */

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues, form]);

  /** ------------------------------------------------
   * 7 依赖引擎
   * ------------------------------------------------ */

  const graph: DependencyGraph<FormInput> = useMemo(() => buildDependencyGraph(fields), [fields]);

  useDependencyEngine<FormInput, any, FormOutput>(form, graph);

  /** ------------------------------------------------
   * 8 提交
   * ------------------------------------------------ */

  const onSubmit = async (data: FormOutput) => {
    // console.log("schema-form submit data",data);
    if (!action) return;
    const result = await action(data);

    if (!result.success) {
      onError?.(result);
      return;
    }

    onSuccess?.(result);
  };

  /** ------------------------------------------------
   * 9 section 分组
   * ------------------------------------------------ */

  const sections = useMemo(() => groupFieldsBySection(fields), [fields]);

  /** ------------------------------------------------
   * 10 render
   * ------------------------------------------------ */

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
                <FieldRenderer name={field.name} ui={field.ui} form={form} />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-end pt-4 gap-2">
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
