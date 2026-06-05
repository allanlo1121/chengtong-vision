import { projectClinetRepository } from "../repositories/client";
import { Project } from "../types";

export async function fetchProjectById(id: string): Promise<Project> {
  const project = await projectClinetRepository.findById(id);

  if (!project) {
    throw new Error("未找到项目");
  }

  return project;
}
