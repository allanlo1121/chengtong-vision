import { z } from "zod";
import { ZodSchemaError } from "./types";

export function formatZodError(error: z.ZodError): ZodSchemaError[] {
  const tree = z.treeifyError(error);

  const result: ZodSchemaError[] = [];

  function walk(node: any, path: string[] = []) {
    // 1️⃣ 当前节点 errors
    if (node.errors) {
      node.errors.forEach((msg: string) => {
        result.push({
          field: path.length ? path.join(".") : undefined,
          message: msg,
        });
      });
    }

    // 2️⃣ 对象字段
    if (node.properties) {
      for (const key in node.properties) {
        walk(node.properties[key], [...path, key]);
      }
    }

    // 3️⃣ 数组
    if (node.items) {
      node.items.forEach((item: any, index: number) => {
        walk(item, [...path, String(index)]);
      });
    }
  }

  walk(tree);

  return result;
}
