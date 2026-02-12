// lib/server/subject-options.ts
import { fetchSubjectsByUsages } from "@frontend/lib/repositories/subject.repository";

export async function getSubjectOptions(usage: string | string[]) {
  const subjects = await fetchSubjectsByUsages(usage);

  return subjects.map((s) => ({
    value: s.id,
    label: s.name,
  }));
}
