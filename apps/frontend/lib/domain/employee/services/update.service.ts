import { Result } from "@/lib/shared/contracts/service-result";

import { UpdateEmployeeInput } from "../schemas";

import { employeeRepository } from "../repositories";
import { mapEmployee, mapEmployeeToUpdate } from "../mappers/mapper";
import { Employee } from "../types";

export async function updateEmployee(
  id: string,
  input: UpdateEmployeeInput
): Promise<Result<Employee>> {
  try {
    const data = mapEmployeeToUpdate(input);

    const result = await employeeRepository.update(id, data);
    return {
      success: true,
      data: mapEmployee(result),
      message: "更新成功",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message ?? "更新失败",
    };
  }
}
