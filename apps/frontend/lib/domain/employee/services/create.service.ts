import { CreateEmployeeInput } from "../schemas";
import { Result } from "@/lib/shared/contracts/service-result";
import { employeeRepository } from "../repositories";
import { Employee } from "../types";
import { mapEmployee, mapEmployeeToInsert } from "../mappers";

export async function createEmployee(input: CreateEmployeeInput): Promise<Result<Employee>> {
  try {
    const data = mapEmployeeToInsert(input);
    const result = await employeeRepository.insert(data);
    return {
      success: true,
      data: mapEmployee(result) as Employee,
      message: "创建成功",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message ?? "创建失败",
    };
  }
}
