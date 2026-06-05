import { PaginatedResult } from "@/lib/shared/contracts";
import { Project, ProjectListItem } from "../types";
import { projectRepository } from "../repositories";
import { ProjectQueryType } from "../queries";

export async function listProjects(
  query: ProjectQueryType
): Promise<PaginatedResult<ProjectListItem>> {
  return await projectRepository.paginate(query);
}

export async function fetchProjectById(id: string): Promise<Project> {
  const project = await projectRepository.findById(id);

  if (!project) {
    throw new Error("未找到项目");
  }

  return project;
}
