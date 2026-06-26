import { Card, CardContent } from "@/components/ui/card";

import type { TbmDetail } from "@/lib/domain/tbm/types";

interface TbmHeaderCardProps {
  tbm: TbmDetail;

  actions?: React.ReactNode;
}

export function TbmHeaderCard({ tbm, actions }: TbmHeaderCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-6">
          {/* left */}
          <div className="flex-1 space-y-5">
            {/* title */}
            <div>
              <div className="text-2xl font-bold tracking-tight">{tbm.name}</div>

              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>编码：{tbm.code}</span>

                {tbm.manageCode && <span>管理编号：{tbm.manageCode}</span>}

                {tbm.serialNo && <span>出厂编号：{tbm.serialNo}</span>}
              </div>
            </div>

            {/* summary */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4 lg:grid-cols-6">
              <InfoItem label="厂家" value={tbm.manufacturerName ?? "-"} />

              <InfoItem label="类型" value={tbm.tbmTypeName ?? "-"} />

              <InfoItem label="型号" value={tbm.model ?? "-"} />

              <InfoItem label="直径" value={tbm.diameter ? `${tbm.diameter} m` : "-"} />
            </div>
          </div>

          {/* right */}
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
      </CardContent>
    </Card>
  );
}

function InfoItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>

      <div className="mt-1 font-medium">{value}</div>
    </div>
  );
}
