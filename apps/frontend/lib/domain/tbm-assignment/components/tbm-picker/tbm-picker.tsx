"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";

import { PickerDrawer } from "./picker-drawer";

import type { TbmPickerItem } from "../../types/picker.types";

type Props = {
  selected?: TbmPickerItem | null;
  onChange?: (item: TbmPickerItem | null) => void;
};

export function TbmPicker({ selected, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const displayName = selected?.name ?? "";

  return (
    <>
      <div className="flex gap-2">
        <Input
          placeholder="选择盾构机"
          value={displayName}
          onClick={() => setOpen(true)}
          readOnly
        />
      </div>

      <PickerDrawer
        open={open}
        onOpenChange={setOpen}
        selected={selected}
        onSelect={(tbm) => {
          onChange?.(tbm);
          setOpen(false);
        }}
      />
    </>
  );
}
