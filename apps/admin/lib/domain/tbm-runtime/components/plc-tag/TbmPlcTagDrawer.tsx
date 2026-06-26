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

import { updateTbmPlcTagAction } from "../../actions";

import { SchemaForm } from "@/lib/shared/form-engine/schema-form";
import { UpdateTbmPlcTagSchema } from "../../schemas";
import { TbmPlcTag } from "../../types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValue?: TbmPlcTag;
};

export function TbmPlcTagDrawer({ open, onOpenChange, initialValue }: Props) {
  console.log("TbmPlcTagDrawer", { open, initialValue });
  const tbmId = initialValue?.tbmId;
  console.log("TbmPlcTagDrawer tbmId", { tbmId });
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
            <DrawerTitle>修改TBM PLC标签</DrawerTitle>
            <DrawerDescription>
              {initialValue?.tbmId ? `当前隧道：${initialValue.tbmId}` : "修改当前隧道TBM PLC标签"}
            </DrawerDescription>
          </DrawerHeader>

          <SchemaForm
            schema={UpdateTbmPlcTagSchema}
            initialValues={initialValue}
            action={updateTbmPlcTagAction}
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
