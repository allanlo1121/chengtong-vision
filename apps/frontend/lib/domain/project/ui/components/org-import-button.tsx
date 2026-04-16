"use client";

import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { OrgImportDialog } from "./org-import-dialog";

export function OrgImportButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Upload className="mr-2 h-4 w-4" />
        导入单位
      </Button>

      <OrgImportDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
