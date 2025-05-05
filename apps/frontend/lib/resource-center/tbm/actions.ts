"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  insertTbmMutation,
  updateTbmMutation,
  deleteTbmMutation,
} from "./mutations";
import { ITbmMainForm } from "./types";

export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  name: z.string().min(1, { message: "必须输入一个工程名称。" }),
  type: z.string().min(1, { message: "必须输入一个工程类型。" }), 
  diameter: z.coerce.number().min(0, { message: "必须输入一个直径。" }),
  segmentOuter: z.coerce.number().min(1, { message: "必须输入一个外径。" }),
  productionDate: z.string().min(1, { message: "必须输入一个生产日期。" }),
  ownerId: z.coerce.string().min(1, { message: "请选择所有单位。" }),
  geo: z.string().optional(),
  remark: z.string().optional(),
});

const CreateTbm = FormSchema;
const UpdateTbm = FormSchema;

export async function createTbm(prevState: State, formData: FormData) {
  console.log("formData", formData);
  //Validate from using Zod
  const validatedFields = CreateTbm.safeParse({
    name: formData.get("name"),
    type: formData.get("type"),    
    diameter: formData.get("diameter"),
    segmentOuter: formData.get("segmentOuter"),
    productionDate: formData.get("productionDate"),
    ownerId: formData.get("ownerId"),
    geo: formData.get("geo"),
    remark: formData.get("remark"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "表单字段缺失或不合法，创建失败。",
    };
  }

  // Prepare data for insertion into the database

  const {
    name,
    type,    
    diameter,
    segmentOuter,
    productionDate,
    ownerId,
    geo,
    remark,
  } = validatedFields.data;

  const data: Omit<ITbmMainForm, "id"> = {
    name: name,
    type: type,    
    diameter: Number(diameter),
    segmentOuter: Number(segmentOuter),
    productionDate: productionDate,
    ownerId: ownerId,
    geo: geo ?? null,
    remark: remark,
  };

  try {
    // 1. 插入项目
    const tbmId = await insertTbmMutation(data);

    if (!tbmId) {
      throw new Error("盾构机创建失败");
    }
  } catch (error) {
    console.error("盾构机创建失败：", error);
    return {
      message: "创建盾构机失败，请稍后重试。",
      error,
    };
  }

  // 3. 跳转页面（刷新 + 重定向）
  revalidatePath("/resource-center/tbm");
  redirect("/resource-center/tbm");
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
    type: formData.get("type"),    
    diameter: formData.get("diameter"),
    segmentOuter: formData.get("segmentOuter"),
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
    type,    
    diameter,
    segmentOuter,
    productionDate,
    ownerId,
    geo,
    remark,
  } = validatedFields.data;

  try {
    //1. 更新项目
    const data: Partial<ITbmMainForm> = {
      name: name,
      type: type,
      diameter: Number(diameter),
      segmentOuter: Number(segmentOuter),
      productionDate: productionDate,
      ownerId: ownerId,
      geo: geo ?? null,
      remark: remark,      
    };
    console.log("data", data);
    console.log("id", id);
    await updateTbmMutation(id, data);
    //2. 更新项目负责人
  } catch (error) {
    console.error("修改项目区间失败：", error);
    return {
      message: "修改项目区间失败，请稍后重试。",
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
