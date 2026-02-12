"use server";

import { z } from "zod";
import validator from "validator";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { tbmFormSchema } from "@frontend/types/tbms";
import { insertTbmMutation } from "./mutations";
import { SupabaseTbmRaw } from "./types";
// import { Gender } from "./definitions";

export type State = {
  errors?: {
    tbmName?: string[];
    tbmCode?: string[];
    tbmModel?: string[];
    managerNumber?: string[];
    tbmTypeCode?: string[];
    manufacturerSubajectId?: string[];
  };
  message?: string | null;
};

const CreateTbm = tbmFormSchema;
const UpdateTbm = tbmFormSchema;

export async function createTbm(prevState: State, formData: FormData) {
  console.log("formData", formData);
  //Validate from using Zod
  const validatedFields = CreateTbm.safeParse({
    tbmName: formData.get("tbmName"),
    tbmCode: formData.get("tbmCode"),
    tbmModel: formData.get("tbmModel"),
    managerNumber: formData.get("managerNumber"),
    tbmTypeCode: formData.get("tbmTypeCode"),
    manufacturerSubjectId: formData.get("manufacturerSubjectId"),
    sortOrder: formData.get("sortOrder") ? Number(formData.get("sortOrder")) : null,
    isDisabled: formData.get("isDisabled") === "true" ? true : false,
    deleted: formData.get("deleted") === "true" ? true : false,
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: z.treeifyError(validatedFields.error),
      message: "Missing Fields.Failed to Create Tbm",
    };
  }

  // Prepare data for insertion into the database

  const data: Omit<SupabaseTbmRaw, "id"> = {
    tbm_name: validatedFields.data.tbmName,
    tbm_code: validatedFields.data.tbmCode,
    tbm_model: validatedFields.data.tbmModel,
    manager_number: validatedFields.data.managerNumber,
    tbm_type_code: validatedFields.data.tbmTypeCode,
    manufacturer_subject_id: validatedFields.data.manufacturerSubjectId,
    sort_order: validatedFields.data.sortOrder,
    is_disabled: validatedFields.data.isDisabled,
    deleted: validatedFields.data.deleted,
  };
  console.log("data", data);

  try {
    const id = await insertTbmMutation(data);
    if (!id) {
      console.error("Failed to Create Tbm");
      throw new Error("Database Error: Failed to Create Tbm");
    }
    console.log("Tbm Created");
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Tbm",
      error: error,
    };
  }

  revalidatePath("/tbms");
  redirect("/tbms");
}

// export async function updateEmployee(
//     id: number,
//     prevState: State,
//     formData: FormData
// ) {
//     console.log("formData", formData);
//     console.log("id", id);

//     //Validate from using Zod
//     const validatedFields = UpdateEmployee.safeParse({
//         firstName: formData.get("firstName"),
//         lastName: formData.get("lastName"),
//         phoneNumber: formData.get("phoneNumber"),
//         idCardNumber: formData.get("idCardNumber"),
//         gender: formData.get("gender"),
//         birthdate: formData.get("birthdate"),
//         birthplace: formData.get("birthplace"),
//         ethnicity: formData.get("ethnicity"),
//         email: formData.get("email"),
//         departmentId: formData.get("departmentId"),
//         position: formData.get("position"),
//         positionLevel: formData.get("positionLevel"),
//         professionalTitle: formData.get("professionalTitle"),
//         technicalTitle: formData.get("technicalTitle"),
//         startWorkDate: formData.get("startWorkDate"),
//         transferInDate: formData.get("transferInDate"),
//         transferOutDate: formData.get("transferOutDate"),
//         educationLevel: formData.get("educationLevel"),
//         politicalStatus: formData.get("politicalStatus"),
//         employmentTypeId: formData.get("employmentTypeId"),
//         employerId: formData.get("employerId"),
//         notes: formData.get("notes"),
//         avatar: formData.get("avatar"),
//     });
//     // If form validation fails, return errors early. Otherwise, continue.
//     if (!validatedFields.success) {
//         console.log("validatedFields", validatedFields);
//         return {
//             errors: validatedFields.error.flatten().fieldErrors,
//             message: "Missing Fields.Failed to Update Employee",
//         };
//     }

//     //Prepare data for insertion into the database
//     const {
//         firstName,
//         lastName,
//         phoneNumber,
//         idCardNumber,
//         gender,
//         birthdate,
//         birthplace,
//         ethnicity,
//         email,
//         departmentId,
//         position,
//         positionLevel,
//         professionalTitle,
//         technicalTitle,
//         startWorkDate,
//         transferInDate,
//         transferOutDate,
//         educationLevel,
//         politicalStatus,
//         employmentTypeId,
//         employerId,
//         notes,
//         avatar,
//     } = validatedFields.data;
//     const supabase = await createClient();
//     const sanitizeDateField = (value: string | undefined | null) => (value === '' || value === undefined ? null : value);

//     try {
//         const { data, error } = await supabase
//             .from("employees")
//             .update({
//                 first_name: firstName,
//                 last_name: lastName,
//                 phone_number: phoneNumber,
//                 id_card_number: idCardNumber,
//                 gender: gender,
//                 birthdate: birthdate,
//                 birthplace: birthplace,
//                 ethnicity: ethnicity,
//                 email: email,
//                 department_id: departmentId ? Number(departmentId) : 0,
//                 position: position,
//                 position_level: positionLevel ? Number(positionLevel) : null,
//                 professional_title: professionalTitle,
//                 technical_title: technicalTitle,
//                 start_work_date: sanitizeDateField(startWorkDate),
//                 transfer_in_date: sanitizeDateField(transferInDate),
//                 transfer_out_date: sanitizeDateField(transferOutDate),
//                 education_level: educationLevel,
//                 political_status: politicalStatus,
//                 employment_type_id: employmentTypeId ? Number(employmentTypeId) : null,
//                 employer_id: employerId ? Number(employerId) : null,
//                 notes: notes,
//                 avatar: avatar,
//             })
//             .eq("id", id);
//         if (error) {
//             console.error("Failed to Update Employee:", error);
//             throw new Error("Database Error: Failed to Update Employee");
//         }
//         console.log("Employee Updated", data);
//     } catch (error) {
//         return {
//             message: "Database Error: Failed to Update Employee",
//             error: error,
//         };
//     }

//     revalidatePath("/hrm/employees");
//     redirect("/hrm/employees");
// }

// export async function deleteEmployee(id: number): Promise<void> {
//     const supabase = await createClient();

//     try {
//         // 执行删除操作
//         const { error } = await supabase.from("employees").delete().eq("id", id);

//         if (error) {
//             console.error("删除失败:", error);
//             throw new Error("Database Error: Failed to Delete Employee");
//         }

//         console.log("员工删除成功,ID:", id);
//     } catch (error) {
//         console.error("操作失败:", error);
//         throw new Error("Failed to delete employee.");
//     }

//     // 刷新路径，重定向
//     revalidatePath("/hrm/employees");
//     redirect("/hrm/employees");
// }
