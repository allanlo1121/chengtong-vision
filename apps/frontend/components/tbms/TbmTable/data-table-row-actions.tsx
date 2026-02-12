"use client";

import { useRouter } from "next/navigation";
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

// import { tbmTypes } from "../data/data"
// import { tbmOverviewSchema } from "@frontend/types/tbms"
// import { z } from "zod"

interface DataTableRowActionsProps<Tdata> {
  row: Row<Tdata>;
}

export function DataTableRowActions<Tdata>({ row }: DataTableRowActionsProps<Tdata>) {
  // const tbm = tbmOverviewSchema.parse(row.original)

  // const tunnel = row.original as z.infer<typeof tunnelOverviewSchema>

  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8 data-[state=open]:bg-muted">
          <MoreHorizontal />
          <span className="sr-only">打开操作菜单</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuItem
          onClick={() => {
            const id = (row.original as any).id;
            router.push(`/tbms/${id}/edit`);
          }}
        >
          编辑盾构机
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* ===== 项目状态切换 ===== */}
        {/* <DropdownMenuSub>
          <DropdownMenuSubTrigger>盾构机类型</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={tbm.tbmTypeCode || ""}>
              {tbmTypes.map((type) => (
                <DropdownMenuRadioItem
                  key={type.value}
                  value={type.value}
                >
                  {type.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator /> */}

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
