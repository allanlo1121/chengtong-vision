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

import { ZodSchema } from "zod";

type SchemaFormProps<T extends FieldValues> = {
  schema: ZodSchema<T>;
  initialValues?: DefaultValues<T>;
  action?: (data: T) => Promise<ActionResult<any>>;
  onSuccess?: (result: ActionResult<T>) => void;
  onError?: (result: ActionResult<T>) => void;
  onCancel?: () => void;
};

export function SchemaForm<T extends FieldValues>({
  schema,
  initialValues,
  action,
  onSuccess,
  onError,
  onCancel,
}: SchemaFormProps<T>) {
  /** ------------------------------------------------
   * 1 提取字段
   * ------------------------------------------------ */
  const fields = useMemo(() => extractFields<T>(schema), [schema]);

  /** ------------------------------------------------
   * 2 初始化 form
   * ------------------------------------------------ */
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

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

  const graph = useMemo(() => buildDependencyGraph(fields), [fields]);

  useDependencyEngine(form, graph);

  /** ------------------------------------------------
   * 8 提交
   * ------------------------------------------------ */

  const onSubmit = async (data: T) => {
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
                <FieldRenderer<T> name={field.name} ui={field.ui} form={form} />
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
