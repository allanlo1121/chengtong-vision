"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ParameterTemplateQueryType } from "@/lib/domain/tbm-runtime/queries";
import { AddTemplateParametersDialog } from "./AddTemplateParametersDialog";

interface ParameterToolbarProps {
  query: ParameterTemplateQueryType;
}

export function ParameterToolbar({ query }: ParameterToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between border-b px-6 py-4">
      <div>
        <h1 className="text-lg font-semibold">运行参数</h1>
        <p className="text-sm text-muted-foreground">
          管理 TBM 运行参数、报警属性、趋势属性和报表属性
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Input
          className="w-[260px]"
          placeholder="搜索名称或 code"
          defaultValue={query.search ?? ""}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <AddTemplateParametersDialog
          templateId={Number(query.parameterTemplateId)}
          parameters={[]}
        />

        <Button>新建参数</Button>
      </div>
    </div>
  );
}
