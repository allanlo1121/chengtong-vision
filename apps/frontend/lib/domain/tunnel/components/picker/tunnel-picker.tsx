"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { Input } from "@/components/ui/input";
import { PickerDrawer } from "@/lib/shared/picker/picker-drawer";
import { tunnelPickerColumns } from "./data-table-columns";
import type { TunnelPickerItem, TunnelPickerQuery } from "../../types/";
import { Button } from "@/components/ui/button";
import { listTunnelPicker, fetchTunnelPickerById } from "../../services/client";

type Props = {
  selectedId?: string | null;
  onChange?: (id: string | null) => void;
};

export function TunnelPicker({ selectedId = null, onChange }: Props) {
  // console.log("TunnelPicker render", { selectedId });
  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState<TunnelPickerQuery>({
    search: "",
    page: 1,
    pageSize: 20,
  });

  const [selectedItem, setSelectedItem] = useState<TunnelPickerItem | null>(null);

  // console.log("TunnelPicker selectedItem", { selectedItem });

  useEffect(() => {
    async function loadSelected() {
      if (!selectedId) {
        setSelectedItem(null);
        return;
      }

      const item = await fetchTunnelPickerById(selectedId);

      setSelectedItem(item ?? null);
    }

    loadSelected();
  }, [selectedId]);

  const { data, isLoading } = useSWR(open ? ["tunnel-picker", query] : null, () =>
    listTunnelPicker(query)
  );

  function handleSelect(item: TunnelPickerItem) {
    // console.log("TunnelPicker handleSelect", { item });
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
          placeholder="选择隧道..."
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

      <PickerDrawer<TunnelPickerItem>
        open={open}
        onOpenChange={setOpen}
        title="选择隧道"
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
          // console.log("TunnelPicker onConfirm", { item });
          if (!item) return;

          handleSelect(item);
          setOpen(false);
        }}
        columns={tunnelPickerColumns}
      />
    </>
  );
}
