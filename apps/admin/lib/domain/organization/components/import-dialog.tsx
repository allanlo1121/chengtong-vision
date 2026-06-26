import { Import } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ImportOrganizationDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Import className="mr-2 h-4 w-4" />
          导入组织
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>导入组织</DialogTitle>
          <DialogDescription>请选择要导入的组织数据文件（CSV格式）。</DialogDescription>
        </DialogHeader>
        <div className="grid w-full items-center gap-4 py-4">
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="file-upload" className="text-sm font-medium">
              选择文件
            </Label>
            <Input
              id="file-upload"
              type="file"
              accept=".csv"
              className="file-input file-input-bordered w-full"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button
            onClick={() => {
              // Handle file import logic here
            }}
          >
            导入
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
