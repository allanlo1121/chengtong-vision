import { idSchema } from "@/lib/shared/schema";

import { z } from "zod";

/**
 * MQTT用户字段规则
 */
export const MqttUserSchema = z.object({
  username: z.string().max(20, { message: "用户名最多20个字符" }).meta({
    table: "mqtt_users",
    label: "用户名",
    field: "username",
    searchable: true, // ⭐
    sortable: true,
    component: "input",
    section: "基本信息",
    type: "text",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
  }),
  userType: z.string().meta({
    table: "mqtt_users",
    label: "用户类型",
    field: "userType",
    searchable: true, // ⭐
    sortable: true,
    component: "select",
    section: "基本信息",
    type: "text",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
    options: [
      { label: "TBM用户", value: "tbm" },
      { label: "平台用户", value: "platform" },
      { label: "监控用户", value: "monitor" },
      { label: "服务用户", value: "service" },
    ],
  }),
  tbmId: idSchema.meta({
    table: "mqtt_users",
    label: "TBM ID",
    field: "tbmId",
    searchable: true, // ⭐
    sortable: true,
    component: "tbmPicker",
    section: "基本信息",
    type: "text",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "tbms" },
  }),
  password: z.string().max(50, { message: "密码最多50个字符" }).meta({
    table: "mqtt_users",
    label: "密码",
    field: "password",
    searchable: false,
    sortable: false,
    component: "input",
    section: "基本信息",
    type: "text",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
  }),
  isSuperuser: z.boolean().default(false).meta({
    table: "mqtt_users",
    label: "是否超级用户",
    field: "isSuperuser",
    searchable: true, // ⭐
    sortable: true,
    component: "switch",
    section: "基本信息",
    type: "boolean",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
  }),
  topicPrefix: z.string().max(100, { message: "主题前缀最多100个字符" }).meta({
    table: "mqtt_users",
    label: "主题前缀",
    field: "topicPrefix",
    searchable: false,
    sortable: false,
    component: "input",
    section: "基本信息",
    type: "text",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
  }),
  isEnabled: z.boolean().default(true).meta({
    table: "mqtt_users",
    label: "是否启用",
    field: "isEnabled",
    searchable: true, // ⭐
    sortable: true,
    component: "switch",
    section: "基本信息",
    type: "boolean",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
  }),
});

export const mqttAclSchema = z.array(
  z.object({
    id: z.string(),
    permission: z.enum(["allow", "deny"]),
    action: z.enum(["publish", "subscribe"]),
    topic: z.string(),
  })
);

export const CreateMqttUserSchema = MqttUserSchema;

export type CreateMqttUserInput = z.infer<typeof CreateMqttUserSchema>;

export type MqttUserInput = z.infer<typeof MqttUserSchema>;

export type MqttUserFields = keyof z.infer<typeof MqttUserSchema>;
