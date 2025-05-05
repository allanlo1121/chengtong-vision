"use client";

import { IRegion, ProjectStatus } from "@/lib/project/types";
import {
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/form-input";
import { useActionState } from "react";
import FormSelect from "@/components/ui/form-select";
import { Leader } from "@/lib/hrm/definitions";
import { createProject, State } from "@/lib/project/actions";

export default function Form({
  regions,
  leaders,
}: {
  regions: IRegion[];
  leaders: Leader[];
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createProject, initialState);
  //console.log("state:", state);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* employee Name */}

        <FormInput
          id="name"
          name="name"
          label="工程名称"
          type="text"
          placeholder="输入工程名称"
          errors={state.errors?.name || []}
          IconComponent={UserCircleIcon}
        />

        <FormInput
          id="shortName"
          name="shortName"
          label="工程简称"
          type="text"
          placeholder="输入工程简称"
          errors={state.errors?.shortName || []}
          IconComponent={UserCircleIcon}
        />
        <div className="grid grid-cols-2 gap-4">
          {/* Region */}
          <FormSelect
            id="regionId"
            name="regionId"
            label="所在片区"
            options={regions.map((r) => ({
              value: r.id.toString(),
              label: r.name,
            }))}
            IconComponent={CurrencyDollarIcon}
          />

          {/* 地址信息*/}
          <FormInput
            id="addressName"
            name="addressName"
            label="工程地址"
            type="text"
            placeholder="输入工程所在地"
            IconComponent={CurrencyDollarIcon}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormSelect
            id="status"
            name="status"
            label="工程状态"
            options={[
              ...Object.entries(ProjectStatus).map(([key, value]) => ({
                value: key,
                label: value,
              })),
            ]}
            defaultValue=""
            showPlaceholder={false}
            IconComponent={CurrencyDollarIcon}
          />

          <FormInput
            id="constructionCosts"
            name="constructionCosts"
            label="合约造价"
            type="number"
            defaultValue="0.00"
            placeholder=""
            IconComponent={CurrencyDollarIcon}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {/* 开工日期 */}
          <FormInput
            id="contractStartDate"
            name="contractStartDate"
            label="开工日期"
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            placeholder="输入开工日期"
            IconComponent={CurrencyDollarIcon}
          />
          {/* 竣工日期 */}
          <FormInput
            id="contractEndDate"
            name="contractEndDate"
            label="竣工日期"
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            placeholder="输入竣工日期"
            IconComponent={CurrencyDollarIcon}
          />
        </div>

        {/* Leader */}
        <FormSelect
          id="leaderId"
          name="leaderId"
          label="项目负责人"
          options={leaders.map((ld) => ({
            value: ld.id.toString(),
            label: ld.fullName,
          }))}
          IconComponent={CurrencyDollarIcon}
        />

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/hrm/employees"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            取消
          </Link>
          <Button type="submit">提交</Button>
        </div>
      </div>
    </form>
  );
}
