"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export type State = {
  errors?: {    
    departmentName?: string[];
    managerId?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  departmentName: z
    .string({ message: "必须输入一个部门名称." })
    .min(1, { message: "部门名称不能为空。" }),
  // 设置 managerId 为可选字段，允许为空字符串
  managerId: z.coerce.string().optional().or(z.literal("")),
});

const CreateDepartment = FormSchema;
const UpdateDepartment = FormSchema;

export async function createDepartment(prevState: State, formData: FormData) {
  console.log("formData", formData);
  //Validate from using Zod
  const validatedFields = CreateDepartment.safeParse({  
    departmentName: formData.get("departmentName"),
    managerId: formData.get("managerId") || undefined,
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "缺少字段，创建部门失败。",
    };
  }

  // Prepare data for insertion into the database
  const { departmentName, managerId } = validatedFields.data;

  const supabase = await createClient();

  try {
    const { error } = await supabase.from("departments").insert({
     
      department_name: departmentName,
      // 仅在 managerId 存在时插入
      ...(managerId && { manager_id: managerId }),
    });
    if(error) {
      console.error("创建失败:", error);
      throw new Error("Database Error: Failed to Create Department");
    }
    console.log("部门创建成功");
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Department",
      error: error,
    };
  }

  revalidatePath("/hrm/departments");
  redirect("/hrm/departments");
}

export async function updateDepartment(
  id: number,
  prevState: State,
  formData: FormData
) {
  console.log("formData", formData);
  //Validate from using Zod
  const validatedFields = UpdateDepartment.safeParse({    
    departmentName: formData.get("departmentName"),
    managerId: formData.get("managerId"),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log("validatedFields", validatedFields);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields.Failed to Create Department",
    };
  }

 // console.log("validatedFields", validatedFields);

  // Prepare data for insertion into the database
  const { departmentName, managerId } = validatedFields.data;
  const supabase = await createClient();

  try {
    const {  error } = await supabase
      .from("departments")
      .update({
        department_name: departmentName,
        manager_id: managerId,
      })
      .eq("id", id);
      if(error){
        console.log(error);        
      }

  } catch (error) {
    return {
      message: "Database Error: Failed to Update Department",
      error: error,
    };
  }

  revalidatePath("/hrm/departments");
  redirect("/hrm/departments");
}

export async function deleteDepartment(id: number): Promise<void> {
  const supabase = await createClient();

  try {
    // 执行删除操作
    const { error } = await supabase
      .from("departments")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("删除失败:", error);
      throw new Error("Database Error: Failed to Delete Department");
    }

    console.log("部门删除成功,ID:", id);

    // 刷新路径，重定向
    revalidatePath("/hrm/departments");
    redirect("/hrm/departments");
  } catch (error) {
    console.error("操作失败:", error);
    throw new Error("Failed to delete department.");
  }
}
