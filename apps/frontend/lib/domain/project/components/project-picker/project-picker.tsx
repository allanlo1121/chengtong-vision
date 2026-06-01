"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";

import { PickerDrawer } from "./picker-drawer";

import type { ProjectPickerItem } from "../../types/picker.types";

type Props = {
  value?: string | null;

  label?: string | null;

  onChange?: (value: string | null) => void;
};

export function ProjectPicker({ value, label, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState<ProjectPickerItem | null>(
    value
      ? {
          id: value,
          name: label ?? "",
        }
      : null
  );

  return (
    <>
      <div className="flex gap-2">
        <Input
          placeholder="选择项目"
          value={selected?.name ?? ""}
          onClick={() => setOpen(true)}
          readOnly
        />
      </div>
      <PickerDrawer
        open={open}
        onOpenChange={setOpen}
        onSelect={(project) => {
          setSelected(project);

          onChange?.(project.id);
        }}
      />
    </>
  );
}
