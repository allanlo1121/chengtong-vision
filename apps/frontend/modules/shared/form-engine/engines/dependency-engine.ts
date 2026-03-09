import { FieldValues, UseFormReturn, Path } from "react-hook-form";
import { FieldDefinition } from "../types/field.types";

export type DependencyGraph<T extends FieldValues> = Map<Path<T>, Path<T>[]>;

/**
 * 从 schema fields 构建依赖图
 *
 * A → B
 * B → C
 *
 * graph:
 * A -> [B]
 * B -> [C]
 */
export function buildDependencyGraph<T extends FieldValues>(
  fields: FieldDefinition<T>[]
): DependencyGraph<T> {
  const graph: DependencyGraph<T> = new Map();

  for (const field of fields) {
    const deps = field.ui?.dependsOn;
    if (!deps || deps.length === 0) continue;

    for (const dep of deps) {
      if (!graph.has(dep)) {
        graph.set(dep, []);
      }

      graph.get(dep)!.push(field.name);
    }
  }

  return graph;
}

/**
 * 获取依赖源字段
 *
 * graph keys = source fields
 */
export function getDependencySources<T extends FieldValues>(graph: DependencyGraph<T>): Path<T>[] {
  return Array.from(graph.keys());
}

/**
 * 依赖引擎
 *
 * 当 source 改变时：
 *
 * A 改变
 *   ↓
 * B 清空
 *   ↓
 * C 清空
 */
export function runDependencyEngine<T extends FieldValues>(
  graph: DependencyGraph<T>,
  changedFields: Path<T>[],
  form: UseFormReturn<T>
) {
  const visited = new Set<Path<T>>();
  const queue: Path<T>[] = [...changedFields];

  while (queue.length > 0) {
    const field = queue.shift()!;

    const children = graph.get(field);
    if (!children) continue;

    for (const child of children) {
      if (visited.has(child)) continue;

      visited.add(child);

      const value = form.getValues(child);

      if (value !== undefined && value !== null && value !== "") {
        form.setValue(child, undefined as any, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }

      queue.push(child);
    }
  }
}
