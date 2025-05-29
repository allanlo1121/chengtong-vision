"use server";


import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  insertTbmMutation,
  updateTbmMutation,
  deleteTbmMutation,
} from "./mutations";

import { TbmFormSchema, TypeTbmFormSchema } from "./types";

export type State = {
  errors?: {
    name?: string[];
    code?: string[];
    typeId?: string[];
    diameter?: string[];
  };
  message?: string | null;
  success?: boolean;  
  formValues?: Record<string, string>;
  tbmId?: string;
  tbmCode?: string;
  createMqttUser?: boolean;
};

const CreateTbm = TbmFormSchema.omit({ id: true });
const UpdateTbm = TbmFormSchema.omit({ id: true });

export async function createTbm(prevState: State, formData: FormData) {
  // console.log("createTbm");

  // console.log("TbmFormData", formData);
  //Validate from using Zod
  const validatedFields = CreateTbm.safeParse({
    name: formData.get("name"),
    code: formData.get("code"),
    typeId: Number(formData.get("typeId")),
    diameter: formData.get("diameter"),
    segmentOuter: formData.get("segmentOuter"),
    producerId: formData.get("producerId") || null,
    productionDate: formData.get("productionDate"),
    ownerId: formData.get("ownerId") || null,
    geo: formData.get("geo"),
    createMqttUser: formData.get("createMqttUser"),
    remark: formData.get("remark"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.error("❌ 表单校验失败:", validatedFields.error.format());

    return {
      errors: validatedFields.error.flatten().fieldErrors,
      fullError: validatedFields.error.format(), // 更详细的嵌套结构（含 _errors）
      message: "表单字段缺失或不合法，创建失败。",
      success: false,
      formValues: {
        name: formData.get("name")?.toString()||"",
        code: formData.get("code")?.toString()||"",
        typeId: formData.get("typeId")?.toString()||"",
        diameter: formData.get("diameter")?.toString()||"",
        segmentOuter: formData.get("segmentOuter")?.toString()||"",
        producerId: formData.get("producerId")?.toString()||"",
        productionDate: formData.get("productionDate")?.toString()||"",
        ownerId: formData.get("ownerId")?.toString()||"",
        geo: formData.get("geo")?.toString()||"",
        createMqttUser: formData.get("createMqttUser")?.toString()||"",
        remark: formData.get("remark")?.toString()||"",
      }
    };
  }

  // Prepare data for insertion into the database
  const {
    name,
    code,
    typeId,
    diameter,
    segmentOuter,
    producerId,
    productionDate,
    ownerId,
    geo,
    createMqttUser,
    remark,
  } = validatedFields.data;

  const data: Omit<TypeTbmFormSchema, "id" | "createMqttUser"> = {
    name: name,
    code: code,
    typeId: Number(typeId),
    diameter: Number(diameter),
    segmentOuter: Number(segmentOuter),
    producerId: producerId,
    productionDate: productionDate,
    ownerId: ownerId,
    geo: geo,
    remark: remark,
  };
  console.log("data", data);

  try {
    // 1. 插入 tbm
    const tbmId = await insertTbmMutation(data);
    if (!tbmId) {
      return {
        success: false,
        message: "盾构机创建失败 ❌",
      };
    }
    return {
      success: true,
      message: "盾构机创建成功 ✅",
      tbmId,
      tbmCode: code,
      createMqttUser: createMqttUser === true, // boolean
      
    };



  } catch (error) {
    console.error("创建失败：", error);
    return {
      success: false,
      message: "创建失败，请稍后重试。",
    };
  }


}

export async function updateTbm(
  id: string,
  prevState: State,
  formData: FormData
) {
  console.log("formData", formData);

  //Validate from using Zod
  const validatedFields = UpdateTbm.safeParse({
    name: formData.get("name"),
    code: formData.get("code"),
    typeId: formData.get("typeId"),
    diameter: formData.get("diameter"),
    segmentOuter: formData.get("segmentOuter"),
    producerId: formData.get("producerId"),
    productionDate: formData.get("productionDate"),
    ownerId: formData.get("ownerId"),
    geo: formData.get("geo"),
    remark: formData.get("remark"),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log("validatedFields", validatedFields);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields.Failed to Update tbm.",
    };
  }

  //Prepare data for insertion into the database
  const {
    name,
    code,
    typeId,
    diameter,
    segmentOuter,
    producerId,
    productionDate,
    ownerId,
    geo,
    remark,
  } = validatedFields.data;

  try {
    //1. 更新项目
    const data: Partial<TypeTbmFormSchema> = {
      name: name,
      code: code,
      typeId: Number(typeId),
      diameter: Number(diameter),
      segmentOuter: Number(segmentOuter),
      producerId: producerId,
      productionDate: productionDate,
      ownerId: ownerId,
      geo: geo,
      remark: remark,
    };
    console.log("data", data);
    console.log("id", id);

    await updateTbmMutation(id, data);
    console.log("盾构机信息修改成功，ID:", id);

  } catch (error) {
    console.error("修改盾构机信息失败：", error);
    return {
      message: "修改盾构机信息失败，请稍后重试。",
      error,
    };
  }

  revalidatePath("/resource-center/tbm");
  redirect("/resource-center/tbm");
}

export async function deleteTbm(id: string): Promise<void> {
  try {
    // 执行删除操作
    await deleteTbmMutation(id);

    console.log("区间删除成功,ID:", id);
  } catch (error) {
    console.error("操作失败:", error);
    throw new Error("Failed to delete tbm.");
  }

  // 刷新路径，重定向
  revalidatePath("/resource-center/tbm");
  redirect("/resource-center/tbm");
}
