"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { ParameterTemplateCreateForm } from "./ParameterTemplateCreateForm";

export function ParameterTemplateCreateDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-2 w-full">
          <Plus className="mr-2 size-4" />
          新建参数模板
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>新建参数模板</DialogTitle>
          <DialogDescription>创建盾构机参数模板，用于维护模板下的运行参数。</DialogDescription>
        </DialogHeader>

        <ParameterTemplateCreateForm
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
