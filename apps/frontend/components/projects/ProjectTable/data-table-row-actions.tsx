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

import { projectStatuses } from "../data/data";
import { projectOverviewSchema } from "@frontend/types/projects/project-overview";

interface DataTableRowActionsProps<Tdata> {
  row: Row<Tdata>;
}

export function DataTableRowActions<Tdata>({ row }: DataTableRowActionsProps<Tdata>) {
  // const project = projectOverviewSchema.parse(row.original)

  const project = row.original as unknown as ReturnType<typeof projectOverviewSchema.parse>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8 data-[state=open]:bg-muted">
          <MoreHorizontal />
          <span className="sr-only">打开操作菜单</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuItem>编辑项目</DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* ===== 项目状态切换 ===== */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>项目状态</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={project.projectStatusName}>
              {projectStatuses.map((status) => (
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
          删除项目
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
