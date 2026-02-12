"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@frontend/components/ui/button";
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
} from "@frontend/components/ui/dropdown-menu";

import { tbmOperationStatuses, tbmTypes } from "../data/data";
import { tbmConnectivityRowSchema } from "@frontend/types/realtime";
import { z } from "zod";

interface DataTableRowActionsProps<Tdata> {
  row: Row<Tdata>;
}

export function DataTableRowActions<Tdata>({ row }: DataTableRowActionsProps<Tdata>) {
  const tbm = tbmConnectivityRowSchema.parse(row.original);

  // const tunnel = row.original as z.infer<typeof tunnelOverviewSchema>

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8 data-[state=open]:bg-muted">
          <MoreHorizontal />
          <span className="sr-only">打开操作菜单</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuItem>编辑盾构机</DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* ===== 项目状态切换 ===== */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>盾构机状态</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={tbm.tbmOperationStatusCode || ""}>
              {tbmOperationStatuses.map((status) => (
                <DropdownMenuRadioItem key={status.value} value={status.value}>
                  {status.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={() => {
            // TODO: delete handler
          }}
        >
          删除TBM
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
