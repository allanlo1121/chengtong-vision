// app/tbms/[id]/_components/OverviewTab.tsx
"use client";

import Link from "next/link";
import { ReadOnlyField } from "@frontend/components/ui/readonly-field";

import { Button } from "@frontend/components/ui/button";
import { TbmOverview } from "@frontend/lib/types/tbm.type";

export default function OverviewTab(tbmOverview: TbmOverview) {
  const initialState = { success: undefined, errors: {} as Record<string, string[]> };

  return (
    <div className="rounded-md w-full bg-gray-50 p-4 md:p-6">
      {/* <input type="hidden" name="id" value={tbmOverview.id} /> */}

      <div className="w-full grid grid-cols-2 gap-4">
        <ReadOnlyField label="盾构机名称" value={tbmOverview.tbmName} />
        <ReadOnlyField label="管理编号" value={tbmOverview.managementNumber} />
        <ReadOnlyField label="序列号" value={tbmOverview.serialNumber} />
        <ReadOnlyField label="资产编码" value={tbmOverview.assetCode} />
        <ReadOnlyField label="TBM 编号" value={tbmOverview.tbmCode} />
        <ReadOnlyField label="TBM 类型" value={tbmOverview.tbmTypeName} />
        <ReadOnlyField label="生产厂家" value={tbmOverview.manufacturerSubjectName} />
        <ReadOnlyField label="型号" value={tbmOverview.tbmModel} />
        <ReadOnlyField label="设备来源" value={tbmOverview.mechSourceTypeName} />
        <ReadOnlyField label="所有者" value={tbmOverview.ownerSubjectName} />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/tbms"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          返回
        </Link>
      </div>
    </div>
  );
}
