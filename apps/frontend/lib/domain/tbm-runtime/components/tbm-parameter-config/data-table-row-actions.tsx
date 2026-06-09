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

import {
  deleteTbmParameterConfigAction,
  updateTbmParameterConfigAction,
  updateTbmPlcTagAction,
} from "../../actions";
import { routes } from "@/lib/core/router/router";
import { toast } from "sonner";
import { TbmParameterConfigListItem } from "../../types";

import { useState } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TbmParameterConfigListItem>) {
  const tbmParameterConfig = row.original as unknown as TbmParameterConfigListItem;
  // console.log("DataTableRowActions", { row, tbmParameterConfig });
  const router = useRouter();

  const [tbmParameterConfigOpen, setTbmParameterConfigOpen] = useState(false);

  const handleDelete = async () => {
    if (!confirm("确认删除该隧道吗？")) return;

    try {
      await deleteTbmParameterConfigAction(tbmParameterConfig.tbmParameterId!);

      toast.success("删除成功");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("删除失败");
    }
  };

  const handleUpdate = async () => {
    if (!confirm("确认更新该隧道吗？")) return;

    // try {
    //   const result = await updateTbmParameterConfigAction(tbmParameterConfig);

    //   if (!result.success) {
    //     toast.error(result.message ?? "更新失败");
    //     return;
    //   }

    //   toast.success(result.message ?? "更新成功");
    //   router.refresh();
    // } catch (error) {
    //   console.error(error);
    //   toast.error("删除失败");
    // }
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
              setTbmParameterConfigOpen(true);
            }}
          >
            编辑TBM-PLC地址
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          {/* 
          <DropdownMenuItem onClick={() => router.push(`/equip/tbms/${tbmPlcTag.id}/assignment`)}>
            TBM绑定
          </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => router.push(`/equip/tbms/${tbmPlcTag.id}/parameters`)}>
          TBM参数配置
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push(`/equip/tbms/${tbmPlcTag.id}/plc-tags`)}>
          TBM PLC标签导入
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => router.push(routes.tbms.runtime(tbmPlcTag.id!))}>
          TBM配置
        </DropdownMenuItem> */}

          {/* ===== 所属片区切换 ===== */}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            onSelect={(e) => {
              e.preventDefault();
              // handleDelete();
            }}
          >
            删除TBM-运行参数
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <TbmPlcTagDrawer
        open={tbmPlcTagOpen}
        onOpenChange={setTbmPlcTagOpen}
        initialValue={tbmPlcTag}
      /> */}
    </>
  );
}
