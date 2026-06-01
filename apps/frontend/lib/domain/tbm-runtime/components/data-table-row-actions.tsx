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

import { TbmListItem } from "@/lib/domain/tbm/types";

import { useCrudMutation } from "@/lib/ui/crud/hooks/useCrudMutation";
import { deleteTbmAction } from "../actions";
import { routes } from "@/lib/core/router/router";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TbmListItem>) {
  const tbm = row.original as unknown as TbmListItem;
  const router = useRouter();

  const deleteMutation = useCrudMutation<string, number>({
    action: deleteTbmAction,
    successMessage: "删除成功",
    onSuccess: () => router.refresh(),
  });

  const handleDelete = () => {
    if (!confirm("确认删除该TBM吗？")) return;

    console.log("deleteMutation", deleteMutation);
    deleteMutation.mutate(tbm.id);
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
        <DropdownMenuItem onClick={() => router.push(routes.tbms.edit(tbm.id))}>
          编辑TBM
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => router.push(routes.tbms.runtime(tbm.id))}>
          TBM配置
        </DropdownMenuItem>

        {/* ===== 所属片区切换 ===== */}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onSelect={(e) => {
            e.preventDefault();
            handleDelete();
          }}
        >
          删除TBM
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
