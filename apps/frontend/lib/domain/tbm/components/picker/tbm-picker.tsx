"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

import { PickerDrawer } from "./picker-drawer";

import type { TbmPickerItem } from "../../types/";
import { Button } from "@/components/ui/button";

type Props = {
  selected?: TbmPickerItem | null;
  disabled?: boolean;
  onChange?: (item: TbmPickerItem | null) => void;
};

export function TbmPicker({
  selected: selectedProp = null,
  disabled: disable = false,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState<TbmPickerItem | null>(selectedProp);

  useEffect(() => {
    setSelected(selectedProp);
  }, [selectedProp]);

  function handleSelect(tbm: TbmPickerItem) {
    setSelected(tbm);
    setOpen(false);
    onChange?.(tbm);
  }

  function handleClear() {
    setSelected(null);
    onChange?.(null);
  }

  return (
    <>
      <div className="flex gap-2">
        <Input
          placeholder="选择盾构机..."
          value={selected?.name ?? ""}
          onClick={() => {
            if (!disable) return;
            setOpen(true);
          }}
          readOnly
          disabled={disable}
        />
        {selected && !disable && (
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
