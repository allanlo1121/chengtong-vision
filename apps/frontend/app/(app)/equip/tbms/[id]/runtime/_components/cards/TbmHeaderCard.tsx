"use client";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Settings, Pencil } from "lucide-react";

import { Tbm } from "@/lib/domain/tbm/types";

interface TbmHeaderCardProps {
  tbm: Tbm;

  manufacturerName?: string;
}

export function TbmHeaderCard({ tbm, manufacturerName }: TbmHeaderCardProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div
          className="
            flex
            items-start
            justify-between
            gap-6
          "
        >
          {/* ===================================== */}
          {/* left */}
          {/* ===================================== */}

          <div className="space-y-4 flex-1">
            {/* title */}

            <div>
              <div
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                "
              >
                {tbm.name}
              </div>
              <div
                className="
                  mt-1
                  flex
                  flex-wrap
                  items-center
                  gap-4
                  text-sm
                  text-muted-foreground
                "
              >
                <span>
                  编码：
                  {tbm.code}
                </span>

                {tbm.managementCode && (
                  <span>
                    管理编号：
                    {tbm.managementCode}
                  </span>
                )}
              </div>
            </div>

            {/* info */}

            <div
              className="
                grid
                grid-cols-2
                gap-x-8
                gap-y-3
                text-sm

                md:grid-cols-4
              "
            >
              <InfoItem label="厂家" value={manufacturerName ?? "-"} />
              <InfoItem label="直径" value={tbm.diameter ? `${tbm.diameter} m` : "-"} />
              <InfoItem label="长度" value={tbm.length ? `${tbm.length} m` : "-"} />
              <InfoItem label="型号" value={tbm.model ?? "-"} />
            </div>
          </div>

          {/* ===================================== */}
          {/* right */}
          {/* ===================================== */}

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <Button variant="outline" size="sm">
              <Pencil className="size-4" />
              编辑
            </Button>
            <Button size="sm">
              <Settings className="size-4" />
              配置
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// =====================================
// info item
// =====================================

function InfoItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <div
        className="
          text-xs
          text-muted-foreground
        "
      >
        {label}
      </div>

      <div
        className="
          font-medium
        "
      >
        {value}
      </div>
    </div>
  );
}
