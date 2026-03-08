import { Button } from "@/components/ui/button";

export function CrudBatchBar({
  count,
  onClear,
  children,
}: {
  count: number;
  onClear: () => void;
  children?: React.ReactNode;
}) {
  if (!count) return null;

  return (
    <div className="flex items-center justify-between bg-muted px-4 py-2 rounded-md">
      <span>已选择 {count} 项</span>
      <div className="flex items-center gap-2">
        {children}
        <Button variant="ghost" onClick={onClear}>
          取消选择
        </Button>
      </div>
    </div>
  );
}
