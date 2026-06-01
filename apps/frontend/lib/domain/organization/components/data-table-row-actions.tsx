"use client";

import { useRouter } from "next/navigation";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { OrganizationListItem } from "../types";

import { useCrudMutation } from "@/lib/ui/crud/hooks/useCrudMutation";
import { deleteOrganizationAction } from "../actions";
import { routes } from "@/lib/core/router/router";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps<OrganizationListItem>) {
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
        <DropdownMenuItem onClick={() => router.push(routes.organizations.edit(org.id))}>
          编辑组织
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
