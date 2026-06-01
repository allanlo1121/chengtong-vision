// "use client";

// import { useRouter } from "next/navigation";
// import { Row } from "@tanstack/react-table";
// import { MoreHorizontal } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import { EmployeeListItem } from "@/lib/domain/employee/types";

// import { useCrudMutation } from "@/lib/ui/crud/hooks/useCrudMutation";
// import { deleteEmployeeAction } from "../../actions/delete-employee.action";

// interface DataTableRowActionsProps<TData> {
//   row: Row<TData>;
//   onEdit?: (id: string) => void;
//   onDelete?: (id: string) => void;
// }

// export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<EmployeeListItem>) {
//   const employee = row.original as unknown as EmployeeListItem;
//   const router = useRouter();

//   const deleteMutation = useCrudMutation<string, number>({
//     action: deleteEmployeeAction,
//     successMessage: "删除成功",
//     onSuccess: () => router.refresh(),
//   });

//   const handleDelete = () => {
//     if (!confirm("确认删除该员工吗？")) return;

//     console.log("deleteMutation", deleteMutation);
//     deleteMutation.mutate(employee.id);
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="icon" className="size-8 data-[state=open]:bg-muted">
//           <MoreHorizontal />
//           <span className="sr-only">打开操作菜单</span>
//         </Button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent align="end" className="w-[180px]">
//         <DropdownMenuItem onClick={() => router.push(`/system/employees/${employee.id}/edit`)}>
//           编辑员工
//         </DropdownMenuItem>

//         <DropdownMenuSeparator />

//         {/* ===== 所属片区切换 ===== */}

//         <DropdownMenuSeparator />

//         <DropdownMenuItem
//           variant="destructive"
//           onSelect={(e) => {
//             e.preventDefault();
//             handleDelete();
//           }}
//         >
//           删除员工
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
