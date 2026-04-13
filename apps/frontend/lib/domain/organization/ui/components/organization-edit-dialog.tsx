"use client";

import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { OrganizationListItem } from "../types";
import { SchemaForm } from "@/modules/shared/form-engine/schema-form";

import { UpdateOrganizationSchema } from "../schemas/organization.schema";
import { updateOrganizationAction } from "../actions/update-organization.action";
import { toast } from "sonner";
import { getOrganizationById } from "../services";

interface Props {
  id: string | null;
  open: boolean;
  onClose: () => void;
}

export function OrganizationEditDialog({ id, open, onClose }: Props) {
  const router = useRouter();

  if (!id) return null;

  // const { data, isLoading } = useSWR(
  //     id ? ["organization", id] : null,
  //     () => getOrganizationById(id)
  // )

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>编辑组织</DialogTitle>
        </DialogHeader>

        {/* {data?.success && data.data && (

                    <SchemaForm
                        schema={UpdateOrganizationSchema}
                        defaultValues={data.data}
                        action={updateOrganizationAction}

                        onSuccess={() => {
                            toast.success("修改成功")
                            onClose()
                            router.refresh()

                        }}

                    />

                )} */}
      </DialogContent>
    </Dialog>
  );
}
