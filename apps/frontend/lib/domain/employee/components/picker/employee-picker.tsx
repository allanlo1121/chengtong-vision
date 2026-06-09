"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

import { PickerDrawer } from "./picker-drawer";

import type { EmployeePickerItem } from "../../types";
import { Button } from "@/components/ui/button";

type Props = {
  selected?: EmployeePickerItem | null;
  onChange?: (item: EmployeePickerItem | null) => void;
};

export function EmployeePicker({ selected: selectedProp = null, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState<EmployeePickerItem | null>(selectedProp);

  useEffect(() => {
    setSelected(selectedProp);
  }, [selectedProp]);

  function handleSelect(employee: EmployeePickerItem) {
    setSelected(employee);
    setOpen(false);
    onChange?.(employee);
  }

  function handleClear() {
    setSelected(null);
    onChange?.(null);
  }

  return (
    <>
      <div className="flex gap-2">
        <Input
          placeholder="选择员工"
          value={selected?.name ?? ""}
          onClick={() => setOpen(true)}
          readOnly
        />
        {selected && (
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
