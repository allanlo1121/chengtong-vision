"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { Input } from "@/components/ui/input";
import { PickerDrawer } from "@/lib/shared/picker/picker-drawer";
import { employeePickerColumns } from "./data-table-columns";
import type { EmployeePickerItem, EmployeePickerQuery } from "../../types/";
import { Button } from "@/components/ui/button";
import { listEmployeePicker, fetchEmployeePickerById } from "../../services/client";

type Props = {
  selectedId?: string | null;
  onChange?: (id: string | null) => void;
};

export function EmployeePicker({ selectedId = null, onChange }: Props) {
  // console.log("EmployeePicker render", { selectedId });
  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState<EmployeePickerQuery>({
    search: "",
    page: 1,
    pageSize: 20,
  });

  const [selectedItem, setSelectedItem] = useState<EmployeePickerItem | null>(null);

  // console.log("EmployeePicker selectedItem", { selectedItem });

  useEffect(() => {
    async function loadSelected() {
      if (!selectedId) {
        setSelectedItem(null);
        return;
      }

      const item = await fetchEmployeePickerById(selectedId);

      setSelectedItem(item ?? null);
    }

    loadSelected();
  }, [selectedId]);

  const { data, isLoading } = useSWR(open ? ["employee-picker", query] : null, () =>
    listEmployeePicker(query)
  );

  function handleSelect(item: EmployeePickerItem) {
    // console.log("EmployeePicker handleSelect", { item });
    setSelectedItem(item);

    setOpen(false);

    onChange?.(item.id);
  }

  function handleClear() {
    setSelectedItem(null);

    onChange?.(null);
  }

  return (
    <>
      <div className="flex gap-2">
        <Input
          placeholder="选择员工..."
          value={selectedItem?.name ?? ""}
          onClick={() => setOpen(true)}
          readOnly
        />
        {selectedItem && (
          <Button type="button" variant="outline" onClick={handleClear}>
            清除
          </Button>
        )}
      </div>

      <PickerDrawer<EmployeePickerItem>
        open={open}
        onOpenChange={setOpen}
        title="选择员工"
        loading={isLoading}
        data={data?.items ?? []}
        total={data?.total ?? 0}
        page={data?.page ?? 1}
        pageSize={data?.pageSize ?? 20}
        keyword={query.search}
        placeholder="请输入搜索关键字"
        selectedId={selectedItem?.id ?? null}
        onSelectedItemChange={(item) => setSelectedItem(item)}
        onSearch={(keyword) => {
          setQuery((prev) => ({
            ...prev,
            search: keyword,
            page: 1,
          }));
        }}
        onPaginationChange={(page, pageSize) => {
          setQuery((prev) => ({
            ...prev,
            page,
            pageSize,
          }));
        }}
        onConfirm={() => {
          const item = data?.items.find((x) => x.id === selectedItem?.id);

          if (!item) return;

          handleSelect(item);
          setOpen(false);
        }}
        columns={employeePickerColumns}
      />
    </>
  );
}
