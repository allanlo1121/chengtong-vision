"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";

import { PickerDrawer } from "./picker-drawer";

import type { TunnelPickerItem } from "../../types/picker.types";

type Props = {
  selected?: TunnelPickerItem | null;
  onChange?: (item: TunnelPickerItem | null) => void;
};

export function TunnelPicker({ selected, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const displayName = selected?.name ?? "";

  return (
    <>
      <div className="flex gap-2">
        <Input
          placeholder="选择隧道..."
          value={displayName}
          onClick={() => setOpen(true)}
          readOnly
        />
      </div>

      <PickerDrawer
        open={open}
        onOpenChange={setOpen}
        selected={selected}
        onSelect={(tunnel) => {
          onChange?.(tunnel);
          setOpen(false);
        }}
      />
    </>
  );
}
