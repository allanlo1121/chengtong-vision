import { ActionResult, PageData, PaginatedResult, Result } from "@/modules/shared/contracts";
import { OrganizationListQueryType } from "../schemas/query.schema";

// import { ServiceResult } from "@/modules/shared/types";
import { mapOrganizationList } from "./mapper";
import { createClient } from "@/lib/infra/supabase/server";
import { OrganizationListItem, OrganizationListRow } from "../types";

export async function listOrganizations(
  query: OrganizationListQueryType
): Promise<Result<PaginatedResult<OrganizationListItem>>> {
  try {
    const supabase = await createClient();

    let dbQuery = supabase
      .from("v_organizations_list") // ✅ 用 view
      .select("*", { count: "exact" });

    // 🔍 search
    if (query.search) {
      dbQuery = dbQuery.ilike("name", `%${query.search}%`);
    }

    // 📄 分页
    const from = (query.page - 1) * query.pageSize;
    const to = from + query.pageSize - 1;

    dbQuery = dbQuery.range(from, to);

    const { data, error, count } = await dbQuery;

    if (error) throw error;

    return {
      success: true,
      data: {
        items: (data as OrganizationListRow[]).map(mapOrganizationList),
        total: count ?? 0,
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
