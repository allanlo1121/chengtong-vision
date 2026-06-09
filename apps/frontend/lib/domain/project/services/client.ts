import { searchProjectPicker, projectClinetRepository } from "../repositories/client";
import { PaginatedResult } from "@/lib/shared/contracts";
import { Project, ProjectPickerItem, ProjectPickerQuery } from "../types";

export async function fetchProjectById(id: string): Promise<Project> {
  const project = await projectClinetRepository.findById(id);

  if (!project) {
    throw new Error("未找到项目");
  }

  return project;
}

export async function listProjectPicker(
  query: ProjectPickerQuery
): Promise<PaginatedResult<ProjectPickerItem>> {
  return await searchProjectPicker(query);
}
