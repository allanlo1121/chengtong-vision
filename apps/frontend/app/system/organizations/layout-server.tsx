// import { ErrorBlock } from "@/components/common/error-block";
// import { getOrganizationTree } from "@/modules/organization/services";
// import { OrganizationTree } from "@/modules/organization/ui/components/organization-tree";

// export default async function OrganizationsLayout({ children }: { children: React.ReactNode }) {
//   const data = await getOrganizationTree();
//   if (!data.success) {
//     return <ErrorBlock message={data.message} />;
//   }

//   const nodes = data.data ?? [];

//   console.log("org-tree", nodes);

//   return (
//     <div className="flex h-full">
//       {/* 左侧树 */}
//       <div className="w-64 border-r overflow-auto">
//         <OrganizationTree nodes={nodes} />
//       </div>

//       {/* 右侧页面 */}
//       <div className="flex-1 overflow-auto p-6">{children}</div>
//     </div>
//   );
// }
