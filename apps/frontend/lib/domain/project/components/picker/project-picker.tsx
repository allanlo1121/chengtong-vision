"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { PickerDrawer } from "./picker-drawer";

import type { ProjectPickerItem } from "../../types/picker.types";

type Props = {
  selected?: ProjectPickerItem | null;
  disabled?: boolean;
  onChange?: (item: ProjectPickerItem | null) => void;
};

export function ProjectPicker({
  selected: selectedProp = null,
  disabled = false,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState<ProjectPickerItem | null>(selectedProp);

  useEffect(() => {
    setSelected(selectedProp);
  }, [selectedProp]);

  function handleSelect(project: ProjectPickerItem) {
    setSelected(project);
    setOpen(false);
    onChange?.(project);
  }

  function handleClear() {
    setSelected(null);
    onChange?.(null);
  }

  return (
    <>
      <div className="flex gap-2">
        <Input
          placeholder="选择项目"
          value={selected?.name ?? ""}
          onClick={() => {
            if (!disabled) setOpen(true);
          }}
          readOnly
          disabled={disabled}
        />

        {selected && !disabled && (
          <Button type="button" variant="outline" onClick={handleClear}>
            清除
          </Button>
        )}
      </div>

      <PickerDrawer open={open} onOpenChange={setOpen} onSelect={handleSelect} />
    </>
  );
}
