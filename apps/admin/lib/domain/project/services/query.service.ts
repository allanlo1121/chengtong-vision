import { appErrors, PaginatedResult } from "@/lib/shared/contracts";
import { Project, ProjectDetail, ProjectListItem } from "../types";
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
    throw appErrors.notFound("Project not found");
  }

  return project;
}

export async function fetchProjectDetailById(id: string): Promise<ProjectDetail> {
  const project = await projectRepository.findDetailById(id);

  if (!project) {
    throw appErrors.notFound("Project not found");
  }

  return project;
}
