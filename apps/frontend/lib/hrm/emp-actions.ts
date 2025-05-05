"use server";

import { z } from "zod";
import validator from "validator";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Gender } from "./definitions";

export type State = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    phoneNumber?: string[];
    email?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  firstName: z.string().min(1, { message: "必须输入一个名字." }),
  lastName: z.string().min(1, { message: "必须输入一个姓氏." }),
  phoneNumber: z
    .string()
    .min(1, { message: "必须输入电话号码." })
    .refine((value) => validator.isMobilePhone(value, "zh-CN"), {
      message: "请输入一个有效的手机号码.",
    }),
  idCardNumber: z.string().optional(),
  departmentId: z.string().optional(),
  gender: z.nativeEnum(Gender).optional(),
  birthdate: z.string().optional(),
  birthplace: z.string().optional(),
  ethnicity: z.string().optional(),
  email: z.string().email().optional(),
  position: z.string().optional(),
  positionLevel: z.string().optional(),
  professionalTitle: z.string().optional(),
  technicalTitle: z.string().optional(),
  startWorkDate: z.string().optional(),
  transferInDate: z.string().optional(),
  transferOutDate: z.string().optional(),
  educationLevel: z.string().optional(),
  politicalStatus: z.string().optional(),
  employmentTypeId: z.string().optional(),
  employerId: z.string().optional(),
  notes: z.string().optional(),
  avatar: z.string().optional(),
});

const CreateEmployee = FormSchema;
const UpdateEmployee = FormSchema;

export async function createEmployee(prevState: State, formData: FormData) {
   console.log("formData", formData);
  //Validate from using Zod
  const validatedFields = CreateEmployee.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phoneNumber: formData.get("phoneNumber"),
    idCardNumber: formData.get("idCardNumber"),
    gender: formData.get("gender"),
    birthdate: formData.get("birthdate"),
    birthplace: formData.get("birthplace"),
    ethnicity: formData.get("ethnicity"),
    email: formData.get("email"),
    position: formData.get("position"),
    positionLevel: formData.get("positionLevel"),
    professionalTitle: formData.get("professionalTitle"),
    technicalTitle: formData.get("technicalTitle"),
    startWorkDate: formData.get("startWorkDate"),
    transferInDate: formData.get("transferInDate"),
    transferOutDate: formData.get("transferOutDate"),
    educationLevel: formData.get("educationLevel"),
    politicalStatus: formData.get("politicalStatus"),
    employmentTypeId: formData.get("employmentTypeId"),
    employerId: formData.get("employerId"),
    notes: formData.get("notes"),
    avatar: formData.get("avatar"),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields.Failed to Create Employee",
    };
  }

  // Prepare data for insertion into the database

  const data = {
    first_name: validatedFields.data.firstName,
    last_name: validatedFields.data.lastName,
    birthdate: validatedFields.data.birthdate,
    birthplace: validatedFields.data.birthplace,
    gender: validatedFields.data.gender,
    ethnicity: validatedFields.data.ethnicity,
    email: validatedFields.data.email,
    phone_number: validatedFields.data.phoneNumber,
    position: validatedFields.data.position,
    avatar: validatedFields.data.avatar,
    education_level: validatedFields.data.educationLevel,
    political_status: validatedFields.data.politicalStatus,
    department_name: validatedFields.data.departmentId,
    professional_title: validatedFields.data.professionalTitle,
    technical_title: validatedFields.data.technicalTitle,
    start_work_date: validatedFields.data.startWorkDate,
    transfer_in_date: validatedFields.data.transferInDate,
    transfer_out_date: validatedFields.data.transferOutDate,
    notes: validatedFields.data.notes,
    employment_type_id: validatedFields.data.employmentTypeId,
    employer_id: validatedFields.data.employerId,
  };
   console.log("data", data);

  const supabase = await createClient();

  try {
    const { error } = await supabase.from("employees").insert(data);
    if (error) {
      console.error("Failed to Create Employee:", error);
      throw new Error("Database Error: Failed to Create Employee");
    }
    console.log("Employee Created");
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Employee",
      error: error,
    };
  }

  revalidatePath("/hrm/employees");
  redirect("/hrm/employees");
}

export async function updateEmployee(
  id: number,
  prevState: State,
  formData: FormData
) {
  console.log("formData", formData);
  console.log("id", id);

  //Validate from using Zod
  const validatedFields = UpdateEmployee.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phoneNumber: formData.get("phoneNumber"),
    idCardNumber: formData.get("idCardNumber"),
    gender: formData.get("gender"),
    birthdate: formData.get("birthdate"),
    birthplace: formData.get("birthplace"),
    ethnicity: formData.get("ethnicity"),
    email: formData.get("email"),
    departmentId: formData.get("departmentId"),
    position: formData.get("position"),
    positionLevel: formData.get("positionLevel"),
    professionalTitle: formData.get("professionalTitle"),
    technicalTitle: formData.get("technicalTitle"),
    startWorkDate: formData.get("startWorkDate"),
    transferInDate: formData.get("transferInDate"),
    transferOutDate: formData.get("transferOutDate"),
    educationLevel: formData.get("educationLevel"),
    politicalStatus: formData.get("politicalStatus"),
    employmentTypeId: formData.get("employmentTypeId"),
    employerId: formData.get("employerId"),
    notes: formData.get("notes"),
    avatar: formData.get("avatar"),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log("validatedFields", validatedFields);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields.Failed to Update Employee",
    };
  }

  //Prepare data for insertion into the database
  const {
    firstName,
    lastName,
    phoneNumber,
    idCardNumber,
    gender,
    birthdate,
    birthplace,
    ethnicity,
    email,
    departmentId,
    position,
    positionLevel,
    professionalTitle,
    technicalTitle,
    startWorkDate,
    transferInDate,
    transferOutDate,
    educationLevel,
    politicalStatus,
    employmentTypeId,
    employerId,
    notes,
    avatar,
  } = validatedFields.data;
  const supabase = await createClient();
  const sanitizeDateField = (value: string | undefined | null) => (value === '' || value === undefined ? null : value);

  try {
    const { data, error } = await supabase
      .from("employees")
      .update({
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        id_card_number: idCardNumber,
        gender: gender,
        birthdate: birthdate,
        birthplace: birthplace,
        ethnicity: ethnicity,
        email: email,
        department_id: departmentId ? Number(departmentId) : 0,
        position: position,
        position_level: positionLevel ? Number(positionLevel) : null,
        professional_title: professionalTitle,
        technical_title: technicalTitle,
        start_work_date: sanitizeDateField(startWorkDate),
        transfer_in_date: sanitizeDateField(transferInDate),
        transfer_out_date: sanitizeDateField(transferOutDate),
        education_level: educationLevel,
        political_status: politicalStatus,
        employment_type_id: employmentTypeId ? Number(employmentTypeId) : null,
        employer_id: employerId ? Number(employerId) : null,
        notes: notes,
        avatar: avatar,
      })
      .eq("id", id);
    if (error) {
      console.error("Failed to Update Employee:", error);
      throw new Error("Database Error: Failed to Update Employee");
    }
    console.log("Employee Updated", data);
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Employee",
      error: error,
    };
  }

  revalidatePath("/hrm/employees");
  redirect("/hrm/employees");
}

export async function deleteEmployee(id: number): Promise<void> {
  const supabase = await createClient();

  try {
    // 执行删除操作
    const { error } = await supabase.from("employees").delete().eq("id", id);

    if (error) {
      console.error("删除失败:", error);
      throw new Error("Database Error: Failed to Delete Employee");
    }

    console.log("员工删除成功,ID:", id);
  } catch (error) {
    console.error("操作失败:", error);
    throw new Error("Failed to delete employee.");
  }

  // 刷新路径，重定向
  revalidatePath("/hrm/employees");
  redirect("/hrm/employees");
}
