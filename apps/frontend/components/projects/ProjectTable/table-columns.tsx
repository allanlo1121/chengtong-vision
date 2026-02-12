// "use client"

// import { ColumnDef } from "@tanstack/react-table"

// import { ProjectOverview } from "@frontend/types/projects"

// // This type is used to define the shape of our data.
// // You can use a Zod schema here if you want.
// // export type Payment = {
// //   id: string
// //   amount: number
// //   status: "pending" | "processing" | "success" | "failed"
// //   email: string
// // }

// export const projectTableColumns: ColumnDef<ProjectOverview>[] = [
//   {
//     accessorKey: "id",
//     header: "主键ID",
//   },
//   {
//     accessorKey: "name",
//     header: "项目简称",
//   },
//   {
//     accessorKey: "fullname",
//     header: "项目全称",
//   },
//   {
//     accessorKey: "projectManagementModeName",
//     header: "项目管理模式",
//   },
//   {
//     accessorKey: "projectRiskLevelName",
//     header: "风险等级",
//   },
//   {
//     accessorKey: "projectTypeName",
//     header: "工程类别",
//   },
//   {
//     accessorKey: "projectStatusName",
//     header: "项目状态",
//   },
//   {
//     accessorKey: "projectAttentionLevelName",
//     header: "项目关注类别",
//   },
//   {
//     accessorKey: "projectControlLevelName",
//     header: "项目管控等级",
//   },
//   {
//     accessorKey: "progressStatusName",
//     header: "项目子状态状态",
//   },
//   {
//     accessorKey: "subProjectTypeName",
//     header: "工程子类型",
//   },
//   {
//     accessorKey: "subProjectAttentionLevelName",
//     header: "项目关注子类别",
//   },
//   {
//     accessorKey: "countryName",
//     header: "国家",
//   },
//   {
//     accessorKey: "provinceName",
//     header: "省份",
//   },
//   {
//     accessorKey: "regionName",
//     header: "地区",
//   },
//   {
//     accessorKey: "cityName",
//     header: "城市",
//   },
//   {
//     accessorKey: "districtName",
//     header: "区县",
//   },
//   {
//     accessorKey: "tunnelCount",
//     header: "隧道数量",
//   },
//   {
//     accessorKey: "planStartDate",
//     header: "计划开始日期",
//   },
//   {
//     accessorKey: "actualStartDate",
//     header: "实际开始日期",
//   },
//   {
//     accessorKey: "planEndDate",
//     header: "计划结束日期",
//   },
//   {
//     accessorKey: "actualEndDate",
//     header: "实际结束日期",
//   },
//   {
//     accessorKey: "commissioningDate",
//     header: "投产日期",
//   },
// ]
