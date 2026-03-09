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

import { regionNames } from "../components/data/data";

import { OrganizationListItem } from "@/modules/organization/types/organization.types";

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
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>所属片区</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={org.regionName}>
              {regionNames.map((region) => (
                <DropdownMenuRadioItem key={region.value} value={region.value}>
                  {region.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive" onClick={() => {}}>
          删除组织
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
