import { FieldValues, UseFormReturn, Path, PathValue } from "react-hook-form";
import { FieldDefinition } from "../types/field.types";

export function buildDependencyGraph<T extends FieldValues>(fields: FieldDefinition<T>[]) {
  const graph = new Map<Path<T>, Path<T>[]>();

  for (const field of fields) {
    const deps = field.ui.dependsOn;
    if (!deps) continue;

    for (const dep of deps) {
      if (!graph.has(dep)) {
        graph.set(dep, []);
      }

      graph.get(dep)!.push(field.name);
    }
  }

  return graph;
}

export function findChangedFields<T extends FieldValues>(prev: T, next: T): Path<T>[] {
  const changed: Path<T>[] = [];

  for (const key of Object.keys(next) as (keyof T)[]) {
    if (prev[key] !== next[key]) {
      changed.push(key as unknown as Path<T>);
    }
  }

  return changed;
}

export function runDependencyEngine<T extends FieldValues>(
  graph: Map<Path<T>, Path<T>[]>,
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

      const current = form.getValues(child);

      if (current !== undefined && current !== null && current !== "") {
        form.setValue(child, undefined as any, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }

      queue.push(child);
    }
  }
}
