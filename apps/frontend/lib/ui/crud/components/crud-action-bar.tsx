//lib/crud/crud-action-bar.tsx

import { Button } from "@/components/ui/button";

interface CrudActionBarProps {
  onCreate?: () => void;
  onImport?: () => void;
  createLabel?: string;
  importLabel?: string;
}

export function CrudActionBar({
  onCreate,
  onImport,
  createLabel = "新建",
  importLabel = "导入",
}: CrudActionBarProps) {
  return (
    <>
      {onImport && (
        <Button variant="outline" onClick={onImport}>
          {importLabel}
        </Button>
      )}
      {onCreate && <Button onClick={onCreate}>{createLabel}</Button>}
    </>
  );
}
