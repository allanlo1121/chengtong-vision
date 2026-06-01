import { TbmRuntimeParameterListItem } from "@/lib/domain/tbm-runtime/types";
import { Badge } from "@/components/ui/badge";

interface ParameterListProps {
  parameters: TbmRuntimeParameterListItem[];
}

export function ParameterList({ parameters }: ParameterListProps) {
  if (parameters.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        暂无参数
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="overflow-hidden rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="border-b">
              <th className="px-4 py-3 text-left font-medium">名称</th>
              <th className="px-4 py-3 text-left font-medium">Code</th>
              <th className="px-4 py-3 text-left font-medium">子系统</th>
              <th className="px-4 py-3 text-left font-medium">类型</th>
              <th className="px-4 py-3 text-left font-medium">单位</th>
              <th className="px-4 py-3 text-left font-medium">属性</th>
            </tr>
          </thead>

          <tbody>
            {parameters.map((item) => (
              <tr key={item.id} className="border-b last:border-b-0">
                <td className="px-4 py-3 font-medium">{item.name}</td>

                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{item.code}</td>

                <td className="px-4 py-3 text-muted-foreground">{item.subsystemName ?? "-"}</td>

                <td className="px-4 py-3">
                  <Badge variant="secondary">{item.dataType}</Badge>
                </td>

                <td className="px-4 py-3 text-muted-foreground">{item.unit ?? "-"}</td>

                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    {item.isAlarm && <Badge>报警</Badge>}
                    {item.isDisabled && <Badge variant="destructive">禁用</Badge>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
