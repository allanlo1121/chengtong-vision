import { createClient } from "@/lib/infra/supabase/server";
import { CreateOrganizationInput } from "../schemas";
import { fromDbEntity } from "@/lib/core/mapper/from-db";
import { toDbInsert } from "@/lib/core/mapper/to-db";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { Database } from "@/lib/core/types/database";
import { Entity } from "@/lib/core/types/entity.types";

export async function insertOrganization(
  input: CreateOrganizationInput
): Promise<Entity<"organizations"> | null> {
  const supabase = await createClient();

  console.log("insertOrganization", input);

  const dbData = toDbInsert(
    "organizations",
    input
  ) as unknown as Database["public"]["Tables"]["organizations"]["Insert"];

  console.log("dbData", dbData);

  const { data: result, error } = await supabase
    .from("organizations")
    .insert(dbData)
    .select("*")
    .single();

  assertNoError(error);

  if (!result) {
    throw new Error(`Insert failed: no data returned for table "organizations"`);
  }

  return fromDbEntity("organizations", result);
}
