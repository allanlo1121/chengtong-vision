"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

import { PickerDrawer } from "./picker-drawer";

import type { EmployeePickerItem } from "../../types";
import { getEmployeePickerItemById } from "../../services/client";

type Props = {
  value?: string | null;

  label?: string | null;

  onChange?: (value: string | null) => void;
};

export function EmployeePicker({ value, label, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState<EmployeePickerItem | null>(
    value
      ? {
          id: value,
          name: label ?? "",
        }
      : null
  );

  useEffect(() => {
    async function load() {
      if (!value) {
        setSelected(null);
        return;
      }

      const emp = await getEmployeePickerItemById(value);

      setSelected(emp);
    }

    load();
  }, [value]);

  return (
    <>
      <div className="flex gap-2">
        <Input
          placeholder="选择员工"
          value={selected?.name ?? ""}
          onClick={() => setOpen(true)}
          readOnly
        />
      </div>
      <PickerDrawer
        open={open}
        onOpenChange={setOpen}
        onSelect={(emp) => {
          setSelected(emp);

          onChange?.(emp.id);
        }}
      />
    </>
  );
}
