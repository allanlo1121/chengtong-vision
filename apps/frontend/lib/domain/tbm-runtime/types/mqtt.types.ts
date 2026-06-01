import { Database } from "@/lib/core/database/types";
import { CreateMqttUserInput } from "../schemas";

export type MqttUserRow = Database["eqp"]["Tables"]["mqtt_user"]["Row"];
export type MqttUserInsert = Database["eqp"]["Tables"]["mqtt_user"]["Insert"];
export type MqttAclRow = Database["eqp"]["Tables"]["mqtt_acl"]["Row"];
export type MqttAclInsert = Database["eqp"]["Tables"]["mqtt_acl"]["Insert"];
export type MqttUserStatusRow = Database["eqp"]["Tables"]["mqtt_user_status"]["Row"];
export type MqttConnectionSessionsRow =
  Database["eqp"]["Tables"]["mqtt_connection_sessions"]["Row"];

export type MqttUserView = Database["eqp"]["Views"]["v_mqtt_users"]["Row"];

export enum MqttUserType {
  "tbm",
  "platform",
  "monitor",
  "service",
}

export type MqttUserItem = {
  username: string;
  userType: string;
  tbmId: string | null;
  isSuperuser: boolean;
  topicPrefix: string;
  isEnabled: boolean;
};

export type MqttAclItem = {
  permission: string;
  action: string;
  topic: string;
};

export type MqttUserRowWithAcl = {
  user: MqttUserRow;
  acl: MqttAclRow[];
};
export type MqttUserStatus = {
  isOnline: boolean;
  clientId: string | null;
  connectedAt: string | null;
  disconnectedAt: string | null;
  disconnectReason: string | null;
};
export type MqttUserWithAcl = {
  user: MqttUserItem;
  acl: MqttAclItem[];
};

export type MqttUserDetail = {
  user: MqttUserItem;
  acl: MqttAclItem[];
  status: MqttUserStatus | null;
};

export type CreateMqttUserServiceInput = Omit<CreateMqttUserInput, "password"> & {
  passwordHash: string;
  salt: string;
};
