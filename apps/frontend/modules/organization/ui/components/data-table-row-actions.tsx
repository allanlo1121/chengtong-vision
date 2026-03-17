"use client";

import { useRouter } from "next/navigation";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { OrganizationListItem } from "@/modules/organization/services";

import { useCrudMutation } from "@/lib/crud/hooks/useCrudMutation";
import { deleteOrganizationAction } from "@/modules/organization/actions/delete-organization.action";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<OrganizationListItem>) {
  const org = row.original as unknown as OrganizationListItem;
  const router = useRouter();

  const deleteMutation = useCrudMutation<string, number>({
    action: deleteOrganizationAction,
    successMessage: "删除成功",
    onSuccess: () => router.refresh(),
  });

  const handleDelete = () => {
    if (!confirm("确认删除该组织吗？")) return;

    console.log("deleteMutation", deleteMutation);
    deleteMutation.mutate(org.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8 data-[state=open]:bg-muted">
          <MoreHorizontal />
          <span className="sr-only">打开操作菜单</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuItem onClick={() => router.push(`/system/organizations/${org.id}/edit`)}>
          编辑项目
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* ===== 所属片区切换 ===== */}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onSelect={(e) => {
            e.preventDefault();
            handleDelete();
          }}
        >
          删除组织
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
