export function collectDependencies(fields) {
  const set = new Set<string>();

  for (const field of fields) {
    field.ui.dependsOn?.forEach((d) => set.add(d));
  }

  return [...set];
}
