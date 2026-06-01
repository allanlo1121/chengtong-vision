import { Result } from "@/lib/shared/contracts";

import { employeeRepository } from "../repositories";
import { mapEmployee } from "../mappers";
import { Employee } from "../types";

// export async function getEmployeeDetailById(id: string): Promise<Result<EmployeeDetail>> {
//     try {
//         console.log("===getEmployeeDetailById===");

//         const row = await employeeRepository.findDetailById(id);

//         if (!row) return { success: false, message: "未查询到员工" };

//         return {
//             success: true,
//             data: mapEmployeeDetail(row),
//         };
//     } catch (error: unknown) {
//         return {
//             success: false,
//             message: (error as Error)?.message ?? "查询失败",
//         };
//     }
// }

export async function getEmployeeById(id: string): Promise<Result<Employee>> {
  try {
    console.log("===getEmployeeById===");

    const row = await employeeRepository.findById(id);

    if (!row) return { success: false, message: "未查询到员工" };

    return {
      success: true,
      data: mapEmployee(row),
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message ?? "查询失败",
    };
  }
}
