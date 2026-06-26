import { insertMqttUser } from "../repositories";

// import {
//     buildTopicPrefix,
// } from "../utils/topic";

// import {
//     generateMqttPassword,
// } from "../utils/password";

import {
  mapCreateMqttUserInputToInsert,
  mapMqttUserViewToMqttUserDetail,
  mapMqttUserWithAclFromMqttUserRowWithAcl,
} from "../mappers";

import { MqttUserDetail, MqttUserWithAcl } from "../types";
import { CreateMqttUserInput } from "../schemas";
import { appErrors } from "@/lib/shared/contracts";
import { hashMqttPassword } from "../utils/password";

export async function createMqttUser(input: CreateMqttUserInput): Promise<MqttUserWithAcl> {
  const { password, ...rest } = input;
  const { salt, passwordHash } = hashMqttPassword(password);
  const insert = mapCreateMqttUserInputToInsert({ ...rest, passwordHash, salt });
  const result = await insertMqttUser(insert);

  if (!result) {
    throw appErrors.internal("创建MQTT用户失败");
  }

  return mapMqttUserWithAclFromMqttUserRowWithAcl(result);
}

import { findByTbmId } from "../repositories";

export async function getMqttUserByTbmId(id: string): Promise<MqttUserDetail | null> {
  // console.log("===getMqttUserByTbmId===");

  const row = await findByTbmId(id);

  if (!row) {
    return null;
  }

  return mapMqttUserViewToMqttUserDetail(row);
}
