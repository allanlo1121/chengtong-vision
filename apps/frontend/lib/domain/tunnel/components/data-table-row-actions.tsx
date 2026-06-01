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

import { useCrudMutation } from "@/lib/ui/crud/hooks/useCrudMutation";
import { deleteTunnelAction } from "../actions";
import { Tunnel, TunnelListItem } from "../types";
import { routes } from "@/lib/core/router/router";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TunnelListItem>) {
  const tunnel = row.original as unknown as TunnelListItem;
  const router = useRouter();

  const deleteMutation = useCrudMutation<string, Tunnel>({
    action: deleteTunnelAction,
    successMessage: "删除成功",
    onSuccess: () => router.refresh(),
  });

  const handleDelete = () => {
    if (!confirm("确认删除该隧道吗？")) return;

    console.log("deleteMutation", deleteMutation);
    deleteMutation.mutate(tunnel.id);
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
        <DropdownMenuItem onClick={() => router.push(routes.tunnels.edit(tunnel.id))}>
          编辑隧道
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
          删除隧道
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
