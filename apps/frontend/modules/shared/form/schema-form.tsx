"use client";

import { ZodObject } from "zod";

import { parseSchema } from "./utils/parse-schema";
import { FieldRenderer } from "./field-renderer";
import { cn } from "@/lib/core/utils";

export function SchemaForm({ form, schema }: { form: any; schema: ZodObject<any> }) {
  const fields = parseSchema(schema);

  // console.log("parse schema", fields);

  return (
    <div className="grid grid-cols-2 gap-4">
      {fields.map((field) => {
        const { name, ui } = field;

        return (
          <div key={name} className={cn("col-span-1", ui.colSpan === 2 && "col-span-2")}>
            <FieldRenderer name={name} ui={ui} form={form} />
          </div>
        );
      })}
    </div>
  );
}
