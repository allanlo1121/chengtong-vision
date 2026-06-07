"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

import { PickerDrawer } from "./picker-drawer";

import type { OrganizationPickerItem } from "../../types";
import { Button } from "@/components/ui/button";

type Props = {
  selected?: OrganizationPickerItem | null;
  disabled?: boolean;
  onChange?: (item: OrganizationPickerItem | null) => void;
};

export function OrganizationPicker({
  selected: selectedProp = null,
  disabled = false,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState<OrganizationPickerItem | null>(selectedProp);

  useEffect(() => {
    setSelected(selectedProp);
  }, [selectedProp]);

  function handleSelect(organization: OrganizationPickerItem) {
    setSelected(organization);
    setOpen(false);
    onChange?.(organization);
  }

  function handleClear() {
    setSelected(null);
    onChange?.(null);
  }

  return (
    <>
      <div className="flex gap-2">
        <Input
          placeholder="选择组织..."
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
