// lib/repositories/subject/subject.repository.ts
import { createClient } from "../supabase/server";

export type Subject = {
  id: string;
  name: string;
  subject_type: string;
};

export async function fetchSubjectsByUsages(usage: string | string[]) {
  const supabase = await createClient();
  const usageCodes = Array.isArray(usage) ? usage : [usage];

  const { data, error } = await supabase.rpc("fetch_subjects_by_usages", {
    p_usage_codes: usageCodes,
  });

  if (error) throw error;
  return data as Subject[];
}
