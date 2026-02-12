// import { createClient } from "../supabase/server";

// import { Project } from "./types";

// export async function fetchProjectsPages(query: string): Promise<number> {
//   const supabase = await createClient();
//   try {
//     // 查询员工信息，仅选择需要的字段，并按员工编号排序
//     let filterQuery = supabase
//       .from("v_projects_overview")
//       .select("*", {
//         count: "exact",
//       })
//       .order("id", { ascending: true });

//     if (query) {
//       const statusValues = ["在建", "停工", "竣工"];
//       // 用 includes 判断 query 是否是 region 或 status
//       if (statusValues.includes(query)) {
//         filterQuery = filterQuery.in("status", [query]);
//       }
//       const conditions = [
//         `name.ilike.%${query}%`,
//         `short_name.ilike.%${query}%`,
//         `address_name.ilike.%${query}%`,
//         `leader.ilike.%${query}%`,
//         `region_name.ilike.%${query}%`,
//       ];
//       filterQuery = filterQuery.or(conditions.join(","));
//     }

//     const { count, error } = await filterQuery;

//     console.log("count", count); // 打印总记录数

//     if (error) {
//       console.error("查询失败:", error);
//       throw new Error("Failed to fetch projects.");
//     }

//     if (count) {
//       const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
//       console.log("Total Pages:", totalPages); // 打印总页数
//       return totalPages;
//     }
//     return 0;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch projects.");
//   }
// }

// export async function fetchProjects(): Promise<Project[]> {
//   const supabase = await createClient();
//   try {
//     // 查询所有项目信息
//     const { data, error } = await supabase
//       .from("v_projects_overview")
//       .select("*", {
//         count: "exact",
//       })
//       .order("id", { ascending: true });

//     if (error) {
//       console.error("查询失败:", error);
//       throw new Error("Failed to fetch projects.");
//     }

//     // 转换为 camelCase 风格
//     if (data && data.length > 0) {
//       const { mapProjectsRawArrayToCamelCase } = await import("@/lib/project/mappers/mapProjectRawToCamelCase");
//       return mapProjectsRawArrayToCamelCase(data) as Project[];
//     }
//     return [];
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch projects.");
//   }
// }
