"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { Search } from "@/components/common/search-input";
import { Button } from "@/components/ui/button";
import { tbmAssignmentQuery } from "../queries";
import { useRouter, useSearchParams } from "next/navigation";
import { routes } from "@/lib/core/router/router";
import { CreateTbmAssignmentDrawer } from "./TbmAssignments";
import { Tbm } from "../../tbm/types";

export function ListToolbar(props: { tbm: Tbm }) {
  const { tbm } = props;
  const router = useRouter();

  const searchParams = useSearchParams();
  const [createOpen, setCreateOpen] = useState(false);

  // 🔥 解析当前 query（关键）
  const query = useMemo(
    () =>
      tbmAssignmentQuery.parse({ ...Object.fromEntries(searchParams.entries()), tbmId: tbm.id }),
    [searchParams, tbm.id]
  );

  const hasFilter = !!query.search;

  return (
    <div className="flex items-center justify-between w-full gap-4">
      <Search placeholder="搜索TBM..." />

      {hasFilter && (
        <Button variant="destructive" size="lg" onClick={() => router.push(routes.tbms.list)}>
          <X />
          重置
        </Button>
      )}

      <div className="flex gap-2 px-8">
        <Button onClick={() => setCreateOpen(true)}>新建</Button>

        <Button onClick={() => router.push(routes.tbms.import)} variant="secondary">
          导入
        </Button>
      </div>
      <CreateTbmAssignmentDrawer
        open={createOpen}
        onOpenChange={setCreateOpen}
        tbmId={tbm.id}
        tbmName={tbm?.name ?? ""}
      />
    </div>
  );
}
