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

import { deleteTunnelAction } from "../actions";
import { TunnelListItem } from "../types";
import { routes } from "@/lib/core/router/router";
import { toast } from "sonner";
import { useState } from "react";
import { TunnelScheduleDrawer } from "./TunnelScheduleDrawer";
import { TunnelStatusTimelineDrawer } from "./TunnelStatusTimelineDrawer";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TunnelListItem>) {
  const tunnel = row.original as unknown as TunnelListItem;
  const router = useRouter();

  const [statusTimelineOpen, setStatusTimelineOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  async function handleDelete() {
    if (!confirm("确认删除该隧道吗？")) return;

    try {
      const result = await deleteTunnelAction(tunnel.id!);

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
  }

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
          <DropdownMenuItem onClick={() => router.push(routes.tunnels.edit(tunnel.id!))}>
            编辑隧道
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setStatusTimelineOpen(true);
            }}
          >
            修改施工状态
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setScheduleOpen(true);
            }}
          >
            调整计划日期
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
      <TunnelStatusTimelineDrawer
        open={statusTimelineOpen}
        onOpenChange={setStatusTimelineOpen}
        tunnelId={tunnel.id!}
        tunnelName={tunnel.name!}
        initialValue={{
          tunnelStatusId: tunnel.tunnelStatusId,
          validFrom: tunnel.validFrom,
          validTo: tunnel.validTo,
          changeType: "manual",
        }}
      />

      <TunnelScheduleDrawer
        open={scheduleOpen}
        onOpenChange={setScheduleOpen}
        tunnelId={tunnel.id!}
        tunnelName={tunnel.name!}
        initialValue={{
          scheduleStartDate: tunnel.scheduleStartDate,
          scheduleEndDate: tunnel.scheduleEndDate,
          versionNo: tunnel.versionNo,
        }}
      />
    </>
  );
}
