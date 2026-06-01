import { PaginatedResult, Result } from "@/lib/shared/contracts";

import { mapProjectList } from "../mappers";

import { ProjectListItem } from "../types";
import { projectRepository } from "../repositories";
import { ProjectQueryType } from "../queries";

export async function listProjects(
  query: ProjectQueryType
): Promise<Result<PaginatedResult<ProjectListItem>>> {
  try {
    const data = await projectRepository.paginate(query);

    console.log("Mapped employee list data:", data);

    return {
      success: true,
      data: {
        ...data,
        items: data.items.map(mapProjectList),
        page: query.page,
        pageSize: query.pageSize,
      },
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message ?? "查询失败",
    };
  }
}
