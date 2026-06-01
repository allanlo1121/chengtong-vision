"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

import { PickerDrawer } from "./picker-drawer";

import type { OrganizationPickerItem } from "../../types";
import { getOrganizationPickerItemById } from "../../services/client";

type Props = {
  value?: string | null;

  label?: string | null;

  onChange?: (value: string | null) => void;
};

export function OrganizationPicker({ value, label, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState<OrganizationPickerItem | null>(
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

      const org = await getOrganizationPickerItemById(value);

      setSelected(org);
    }

    load();
  }, [value]);

  return (
    <>
      <div className="flex gap-2">
        <Input
          placeholder="选择组织"
          value={selected?.name ?? ""}
          onClick={() => setOpen(true)}
          readOnly
        />
      </div>
      <PickerDrawer
        open={open}
        onOpenChange={setOpen}
        onSelect={(org) => {
          setSelected(org);

          onChange?.(org.id);
        }}
      />
    </>
  );
}
