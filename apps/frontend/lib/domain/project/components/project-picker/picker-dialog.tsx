"use client";

import { useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { PickerToolbar } from "./picker-toolbar";
import { PickerTable } from "./picker-table";

import type { ProjectPickerItem, ProjectPickerQuery, ProjectPickerRow } from "../../types";

type Props = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  onSelect: (project: ProjectPickerItem) => void;
};

export function ProjectPickerDialog({ open, onOpenChange, onSelect }: Props) {
  const [query, setQuery] = useState<ProjectPickerQuery>({
    search: "",
    page: 1,
    pageSize: 20,
  });

  const [selected, setSelected] = useState<ProjectPickerItem | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>选择项目</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <PickerToolbar query={query} onChange={setQuery} />

          <PickerTable query={query} selected={selected} onSelectedChange={setSelected} />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>

            <Button
              disabled={!selected}
              onClick={() => {
                if (!selected) return;

                onSelect(selected);

                onOpenChange(false);
              }}
            >
              确认选择
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
