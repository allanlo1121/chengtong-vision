"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function OrgImportDialog({ open, onOpenChange }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleImport() {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    const res = await fetch("/api/org/import", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    setLoading(false);

    console.log(result);

    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>导入单位</DialogTitle>
        </DialogHeader>

        <Input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />

        <Button disabled={!file || loading} onClick={handleImport} className="mt-4">
          {loading ? "导入中..." : "开始导入"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
