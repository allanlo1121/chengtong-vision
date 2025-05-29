"use server";


import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { insertMqttUserMutation } from "./mutations";
import { MqttUserFormSchema, TypeMqttUserFormSchema } from "./types";


export type State = {
  errors?: {
    
  };
  message?: string | null;
};


const CreateMqttUser = MqttUserFormSchema.omit({ id: true });
//const UpdateTbm = MqttUserFormSchema.omit({ id: true });

export async function createMqttUser(prevState: State, formData: FormData) {
  // console.log("createTbm");

  // console.log("TbmFormData", formData);
  //Validate from using Zod
  const validatedFields = CreateMqttUser.safeParse({
    username: formData.get("username"),
    tbmId: formData.get("tbmId"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.error("❌ 表单校验失败:", validatedFields.error.format());

    return {
      errors: validatedFields.error.flatten().fieldErrors,
      fullError: validatedFields.error.format(), // 更详细的嵌套结构（含 _errors）
      message: "表单字段缺失或不合法，创建失败。",
    };
  }

  // Prepare data for insertion into the database
  const {
    username,
    tbmId
  } = validatedFields.data;

  const data: Omit<TypeMqttUserFormSchema, "id"> = {
    username: username,
    tbmId: tbmId,
  };
  console.log("data", data);

  try {
    // 1. 插入 tbm
    const userId = await insertMqttUserMutation(data);

  } catch (error) {
    console.error("创建失败：", error);
    return {
      message: "创建创建mqtt用户，请稍后重试。",
      error,
    };
  }

  // 3. 跳转页面（刷新 + 重定向）
  revalidatePath("/resource-center/tbm");
  redirect("/resource-center/tbm");
}