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
  };
  message?: string | null;
};

const CreateTbm = TbmFormSchema.omit({ id: true });
const UpdateTbm = TbmFormSchema.omit({ id: true });

export async function createTbm(prevState: State, formData: FormData) {
 // console.log("createTbm");
  
 console.log("TbmFormData", formData);
  //Validate from using Zod
  const validatedFields = CreateTbm.safeParse({
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
    console.error("❌ 表单校验失败:", validatedFields.error.format());
  
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      fullError: validatedFields.error.format(), // 更详细的嵌套结构（含 _errors）
      message: "表单字段缺失或不合法，创建失败。",
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
    remark,
  } = validatedFields.data;

  const data: Omit<TypeTbmFormSchema, "id"> = {
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
