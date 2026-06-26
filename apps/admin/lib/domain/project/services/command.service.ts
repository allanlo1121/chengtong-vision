import { projectRepository } from "../repositories";
import { CreateProjectInput, UpdateProjectInput } from "../schemas";
import { Project } from "../types";
import { appErrors } from "@/lib/shared/contracts/error-codes";

export async function createProject(input: CreateProjectInput): Promise<Project> {
  console.log("Creating Project with input", input);

  const exits = await projectRepository.findByCode(input.code);

  if (exits) {
    throw appErrors.conflict("Project编码已存在");
  }
  return await projectRepository.insert(input);
}

export async function updateProject(input: UpdateProjectInput): Promise<Project> {
  console.log("Updating Project with id and input", { input });

  const exits = await projectRepository.findById(input.id);

  if (!exits) {
    throw appErrors.notFound("Project不存在，无法更新");
  }

  return await projectRepository.update(input);
}

export async function deleteProject(id: string): Promise<void> {
  console.log("Deleting Project with id", id);

  const exits = await projectRepository.findById(id);

  if (!exits) {
    throw appErrors.notFound("Project不存在，无法删除");
  }

  await projectRepository.deleteById(id);
}
