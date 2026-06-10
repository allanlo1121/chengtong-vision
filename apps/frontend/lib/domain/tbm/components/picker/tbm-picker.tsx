"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { Input } from "@/components/ui/input";
import { PickerDrawer } from "@/lib/shared/picker/picker-drawer";
import { tbmPickerColumns } from "./data-table-columns";
import type { TbmPickerItem, TbmPickerQuery } from "../../types/";
import { Button } from "@/components/ui/button";
import { listTbmPicker, fetchTbmPickerById } from "../../services/client";

type Props = {
  selectedId?: string | null;
  onChange?: (id: string | null) => void;
};

export function TbmPicker({ selectedId = null, onChange }: Props) {
  // console.log("TbmPicker render", { selectedId });
  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState<TbmPickerQuery>({
    search: "",
    page: 1,
    pageSize: 20,
  });

  const [selectedItem, setSelectedItem] = useState<TbmPickerItem | null>(null);

  // console.log("TbmPicker selectedItem", { selectedItem });

  useEffect(() => {
    async function loadSelected() {
      if (!selectedId) {
        setSelectedItem(null);
        return;
      }

      const item = await fetchTbmPickerById(selectedId);

      setSelectedItem(item ?? null);
    }

    loadSelected();
  }, [selectedId]);

  const { data, isLoading } = useSWR(open ? ["Tbm-picker", query] : null, () =>
    listTbmPicker(query)
  );

  function handleSelect(item: TbmPickerItem) {
    // console.log("TbmPicker handleSelect", { item });
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
          placeholder="选择盾构机..."
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

      <PickerDrawer<TbmPickerItem>
        open={open}
        onOpenChange={setOpen}
        title="选择盾构机"
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
          // console.log("TbmPicker onConfirm", { item });
          if (!item) return;

          handleSelect(item);
          setOpen(false);
        }}
        columns={tbmPickerColumns}
      />
    </>
  );
}
