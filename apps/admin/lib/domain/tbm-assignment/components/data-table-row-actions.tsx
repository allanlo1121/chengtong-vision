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

import { TbmAssignmentListItem } from "../types";

import { deleteTbmAssignmentAction } from "../actions";
import { routes } from "@/lib/core/router/router";
import { toast } from "sonner";
import { UpdateTbm } from "./forms";
import { UpdateTbmAssignmentDrawer } from "./UpdateTbmAssignmentDrawer";
import { useState } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TbmAssignmentListItem>) {
  const tbmAssignment = row.original as unknown as TbmAssignmentListItem;
  const router = useRouter();

  const [updateTbmAssignmentOpen, setUpdateTbmAssignmentOpen] = useState(false);

  const handleDelete = async () => {
    if (!confirm("确认删除该盾构隧道绑定吗？")) return;

    try {
      const result = await deleteTbmAssignmentAction(tbmAssignment.id!);

      if (!result.success) {
        toast.error(result.message ?? "删除失败");
        return;
      }

      toast.success(result.message ?? "删除成功");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("删除失败");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8 data-[state=open]:bg-muted">
            <MoreHorizontal />
            <span className="sr-only">打开操作菜单</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[180px]">
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setUpdateTbmAssignmentOpen(true);
            }}
          >
            调整TBM绑定
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
            删除TBM隧道绑定
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateTbmAssignmentDrawer
        open={updateTbmAssignmentOpen}
        onOpenChange={setUpdateTbmAssignmentOpen}
        tbmAssignment={tbmAssignment}
      />
    </>
  );
}
