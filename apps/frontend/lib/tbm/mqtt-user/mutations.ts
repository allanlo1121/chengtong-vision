import { createClient } from "@/utils/supabase/server";
import crypto from "crypto";
import { TypeMqttUserFormSchema } from "./types";

export async function insertMqttUserMutation(
  input: Omit<TypeMqttUserFormSchema, "id">
): Promise<string> {
  if (!input) throw new Error("No input provided");
  console.log("input", input);
  const salt = crypto.randomUUID().slice(0, 8);
  const password = input.username;
  const hash = crypto.createHash("sha256").update(password + salt).digest("hex");
  const supabase = await createClient();//
  const { data, error } = await supabase
    .from("mqtt_user")
    .insert({
      username: input.username,
      salt: salt,
      password_hash: hash,
      tbm_id: input.tbmId,
    })
    .select("username")
    .single();

  if (error || !data) throw error;
  return data.username;
}

// export async function updateTbmMutation(
//   id: string,
//   input: Partial<TypeTbmFormSchema>
// ): Promise<void> {
//   if (!input) throw new Error("No input provided");
//   const supabase = await createClient();
//   const { error } = await supabase
//     .from("tbms")
//     .update({
//       name: input.name,
//       code: input.code,
//       type_id: input.typeId,
//       diameter: input.diameter,
//       segment_outer:
//         input.segmentOuter === undefined ? null : input.segmentOuter,
//       producer_id: input.producerId === undefined ? null : input.producerId,
//       production_date: input.productionDate,
//       owner_id: input.ownerId === "" ? null : input.ownerId,
//       geo: input.geo === "" ? null : input.geo,
//       remark: input.remark === "" ? null : input.remark,
//     })
//     .eq("id", id);

//   if (error) throw error;
// }

// export async function deleteTbmMutation(id: string): Promise<void> {
//   const supabase = await createClient();
//   const { error } = await supabase.from("tbms").delete().eq("id", id);
//   if (error) throw error;
// }
