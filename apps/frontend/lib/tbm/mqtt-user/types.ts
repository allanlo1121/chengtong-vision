import { z } from "zod";

export const MqttUserFormSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(1, { message: "必须有一个用户名。" }),
  tbmId: z.string().min(1, { message: "必须有一个TbmID。" }),
});

export type TypeMqttUserFormSchema = z.infer<typeof MqttUserFormSchema>;