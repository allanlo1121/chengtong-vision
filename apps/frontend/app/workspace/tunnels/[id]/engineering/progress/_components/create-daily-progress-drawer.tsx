"use client";

import { toast } from "sonner";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { createTbmDailyProgressAction } from "@/lib/domain/tbm-runtime/actions";

import { SchemaForm } from "@/lib/shared/form-engine/schema-form";
import { CreateTbmDailyProgressSchema } from "@/lib/domain/tbm-runtime/schemas";
import { TbmDailyProgress } from "@/lib/domain/tbm-runtime/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tbmId: string;
};

export function CreateTbmDailyProgressDrawer({ open, onOpenChange, tbmId }: Props) {
  console.log("CreateTbmDailyProgressDrawer tbmId", { tbmId });
  if (!tbmId) {
    toast.error("缺少TBM ID");
    onOpenChange(false);
    return null;
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xl">
          <DrawerHeader>
            <DrawerTitle>创建TBM每日进度</DrawerTitle>
            <DrawerDescription>
              {tbmId ? `当前隧道：${tbmId}` : "创建当前隧道TBM每日进度"}
            </DrawerDescription>
          </DrawerHeader>

          <SchemaForm
            schema={CreateTbmDailyProgressSchema}
            initialValues={{ tbmId }}
            action={createTbmDailyProgressAction}
            onSuccess={(r) => {
              toast.success(r.message ?? "创建成功");
              onOpenChange(false);
            }}
            onCancel={() => onOpenChange(false)}
            onError={(error) => {
              console.error("Error submitting form:", error);
            }}
          />
          <DrawerFooter>
            {/* <Button onClick={handleSubmit} disabled={pending}>
              {pending ? "保存中..." : "保存"}
            </Button>

            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button> */}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
