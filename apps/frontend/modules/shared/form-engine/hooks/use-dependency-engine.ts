import { useEffect, useMemo, useRef } from "react";
import { UseFormReturn, FieldValues, Path, useWatch } from "react-hook-form";
import {
  DependencyGraph,
  getDependencySources,
  runDependencyEngine,
} from "../engines/dependency-engine";

export function useDependencyEngine<T extends FieldValues>(
  form: UseFormReturn<T>,
  graph: Map<Path<T>, Path<T>[]>
) {
  const dependencySources = useMemo(() => Array.from(graph.keys()), [graph]);

  const values = useWatch({
    control: form.control,
    name: dependencySources as any,
  });

  const prevRef = useRef(values);

  useEffect(() => {
    const prev = prevRef.current;
    const changed: Path<T>[] = [];
    dependencySources.forEach((field, i) => {
      if (prev?.[i] !== values?.[i]) {
        changed.push(field);
      }
    });

    if (changed.length === 0) return;
    const visited = new Set<Path<T>>();
    const queue: Path<T>[] = [...changed];

    while (queue.length > 0) {
      const field = queue.shift()!;
      const children = graph.get(field);
      if (!children) continue;

      for (const child of children) {
        if (visited.has(child)) continue;
        visited.add(child);
        form.setValue(child, undefined as any, {
          shouldDirty: true,
          shouldValidate: true,
        });
        queue.push(child);
      }
    }
    prevRef.current = values;
  }, [values, graph, form]);
}
