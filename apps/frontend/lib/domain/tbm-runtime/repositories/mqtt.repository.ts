import { createClient } from "@/lib/infra/supabase/server";
import { MqttAclInsert, MqttUserInsert, MqttUserRowWithAcl, MqttUserView } from "../types";
import { assertNoError } from "@/lib/infra/repositories/base.repository";

export async function insertMqttUser(input: MqttUserInsert): Promise<MqttUserRowWithAcl> {
  const supabase = await createClient();

  // =========================
  // 创建 MQTT 用户
  // =========================

  const { data: user, error } = await supabase
    .schema("eqp")
    .from("mqtt_user")
    .insert(input)
    .select()
    .single();

  if (error || !user) {
    console.error("Failed to create MQTT user", { error, user });
    throw error;
  }

  // =========================
  // ACL 数据
  // =========================

  const aclPayload: MqttAclInsert[] = [
    {
      username: input.username,
      permission: "allow",
      action: "publish",
      topic: `${input.topic_prefix}/up/#`,
    },
    {
      username: input.username,
      permission: "allow",
      action: "subscribe",
      topic: `${input.topic_prefix}/down/#`,
    },
  ];

  console.log("ACL Payload", aclPayload);

  // =========================
  // 创建 ACL
  // =========================

  const { data: acl, error: aclError } = await supabase
    .schema("eqp")
    .from("mqtt_acl")
    .insert(aclPayload)
    .select();

  if (aclError || !acl) {
    console.error("Failed to create MQTT ACL", { aclError, acl });
    throw aclError;
  }

  // =========================
  // 返回
  // =========================

  return {
    user,
    acl,
  };
}

export async function findByTbmId(tbmId: string): Promise<MqttUserView | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("eqp")
    .from("v_mqtt_users")
    .select("*")
    .eq("tbm_id", tbmId)
    .maybeSingle();

  console.log("findByTbmId data", data);
  console.log("findByTbmId error", error);

  assertNoError(error);

  return data;
}
