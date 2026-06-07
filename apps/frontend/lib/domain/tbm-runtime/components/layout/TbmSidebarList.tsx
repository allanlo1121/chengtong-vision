import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/core/utils";
import { TbmPickerItem } from "@/lib/domain/tbm/types";
import { routes } from "@/lib/core/router/router";

// const tbms = [
//   {
//     id: "1",
//     name: "中铁装备982",
//     code: "CREC982",
//     manageCode: "1131-0035-0214",
//     tbmTypeName: "土压平衡盾构机",
//     manufacturerName: "中铁装备",
//     diameter: 9110,
//     status: "在线",
//   },
//   {
//     id: "2",
//     name: "罗宾斯423",
//     code: "RBNS423",
//     manageCode: "1131-0035-0213",
//     tbmTypeName: "泥水平衡盾构机",
//     manufacturerName: "中交天和",
//     diameter: 9130,
//     status: "离线",
//   },
// ];

export function TbmSidebarList({
  tbms,
  activeTbmId,
}: {
  tbms: TbmPickerItem[];
  activeTbmId?: string;
}) {
  return (
    <div className="divide-y">
      {tbms.map((tbm) => (
        <Link
          key={tbm.id}
          href={`${routes.tbms.runtime(tbm.id)}?tab=overview`}
          className={cn("block px-4 py-3 transition-colors hover:bg-muted", {
            "bg-muted": tbm.id === activeTbmId,
          })}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{tbm.name}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{tbm.manageCode}</div>
            </div>

            {/* <Badge variant={tbm.status === "在线" ? "default" : "secondary"} className="shrink-0">
              {tbm.status}
            </Badge> */}
          </div>

          <div className="mt-2 space-y-1 text-xs text-muted-foreground">
            <div>{tbm.tbmTypeName}</div>
            <div>{tbm.manufacturerName}</div>
            <div>刀盘直径：{tbm.diameter}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
