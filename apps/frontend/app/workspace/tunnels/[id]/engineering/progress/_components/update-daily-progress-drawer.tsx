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

import { updateTbmDailyProgressAction } from "@/lib/domain/tbm-runtime/actions";

import { SchemaForm } from "@/lib/shared/form-engine/schema-form";
import {
  UpdateTbmDailyProgressInput,
  UpdateTbmDailyProgressSchema,
} from "@/lib/domain/tbm-runtime/schemas";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: UpdateTbmDailyProgressInput;
};

export function UpdateTbmDailyProgressDrawer({ open, onOpenChange, data }: Props) {
  console.log("UpdateTbmDailyProgressDrawer data", { data });
  if (!data?.tbmId) {
    toast.error("缺少TBM ID");
    onOpenChange(false);
    return null;
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xl">
          <DrawerHeader>
            <DrawerTitle>更新TBM每日进度</DrawerTitle>
            <DrawerDescription>
              {data?.tbmId ? `当前隧道：${data.tbmId}` : "更新当前隧道TBM每日进度"}
            </DrawerDescription>
          </DrawerHeader>

          <SchemaForm
            schema={UpdateTbmDailyProgressSchema}
            initialValues={data}
            action={updateTbmDailyProgressAction}
            onSuccess={(r) => {
              toast.success(r.message ?? "更新成功");
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
