"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

import { PickerDrawer } from "./picker-drawer";

import type { TunnelPickerItem } from "../../types/";
import { Button } from "@/components/ui/button";

type Props = {
  selected?: TunnelPickerItem | null;
  disabled?: boolean;
  onChange?: (item: TunnelPickerItem | null) => void;
};

export function TunnelPicker({ selected: selectedProp = null, disabled = false, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState<TunnelPickerItem | null>(selectedProp);

  useEffect(() => {
    setSelected(selectedProp);
  }, [selectedProp]);

  function handleSelect(tunnel: TunnelPickerItem) {
    setSelected(tunnel);
    setOpen(false);
    onChange?.(tunnel);
  }

  function handleClear() {
    setSelected(null);
    onChange?.(null);
  }

  return (
    <>
      <div className="flex gap-2">
        <Input
          placeholder="选择隧道..."
          value={selected?.name ?? ""}
          onClick={() => setOpen(true)}
          readOnly
          disabled={disabled}
        />
        {selected && !disabled && (
          <Button type="button" variant="outline" onClick={handleClear}>
            清除
          </Button>
        )}
      </div>

      <PickerDrawer
        open={open}
        onOpenChange={setOpen}
        selected={selected}
        onSelect={handleSelect}
      />
    </>
  );
}
