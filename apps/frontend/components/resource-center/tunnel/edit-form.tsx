"use client";

import {
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/form-input";
import { useActionState } from "react";
import FormSelect from "@/components/hrm/ui/form-select";
import { updateTunnel, State } from "@/lib/resource-center/tunnel/actions";
import { IProjectBasic, ProjectStatus } from "@/lib/resource-center/types";
import { ITunnelBasicForm } from "@/lib/resource-center/tunnel/types";
import { ITbmBaseInfo } from "@/lib/tbm_del/types";
import { formatDateForInput } from "@/utils/dateFormat";

export default function EditProjectForm({
  tunnel,
  projects,
  tbms,
}: {
  tunnel: ITunnelBasicForm;
  projects: IProjectBasic[];
  tbms: ITbmBaseInfo[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateTunnelWithId = updateTunnel.bind(null, tunnel.id);
  const [state, formAction] = useActionState(updateTunnelWithId, initialState);
  console.log("state", state);
  console.log("tunnel", tunnel); 

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={tunnel.id} />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Project Name */}
        <FormInput
          id="name"
          name="name"
          label="区间名称"
          type="text"
          placeholder="输入区间名称"
          defaultValue={tunnel.name}
          errors={state.errors?.name || []}
          IconComponent={UserCircleIcon}
        />

        <FormInput
          id="shortName"
          name="shortName"
          label="区间简称"
          type="text"
          placeholder="输入区间简称"
          defaultValue={tunnel.shortName}
          errors={state.errors?.shortName || []}
          IconComponent={UserCircleIcon}
        />

        <FormSelect
          id="projectId"
          name="projectId"
          label="所属项目"
          options={projects.map((project: IProjectBasic) => ({
            value: project.id.toString(),
            label: project.shortName,
          }))}
          defaultValue={String(tunnel.projectId)}
          IconComponent={CurrencyDollarIcon}
        />
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
          defaultValue={tunnel.status}
          showPlaceholder={false}
          IconComponent={CurrencyDollarIcon}
        />
        <div className="grid grid-cols-2 gap-4">
          {/* tbm*/}
          <FormSelect
            id="tbmId"
            name="tbmId"
            label="采用的盾构机"
            options={[
              { value: "", label: "未知" },  // 👈 空值代表 null
              ...tbms.map((tbm: ITbmBaseInfo) => ({
                value: tbm.id.toString(),
                label: tbm.name,
              }))
            ]}
            defaultValue={tunnel.tbmId ? String(tunnel.tbmId) : ""}
            IconComponent={CurrencyDollarIcon}
          />
          <FormInput
            id="wtype"
            name="wtype"
            label="地质情况"
            type="text"
            defaultValue={tunnel.wtype}
            placeholder="输入地质情况"
            errors={state.errors?.shortName || []}
            IconComponent={UserCircleIcon}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            id="ringStart"
            name="ringStart"
            label="起始环号"
            type="number"
            placeholder="请输入起始环号"
            defaultValue={tunnel.ringStart}
            IconComponent={CurrencyDollarIcon}
          />
          <FormInput
            id="ringEnd"
            name="ringEnd"
            label="结束环号"
            type="number"
            placeholder="请输入结束环号"
            defaultValue={tunnel.ringEnd}
            IconComponent={CurrencyDollarIcon}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            id="opNumStart"
            name="opNumStart"
            label="起始里程"
            type="number"
            step="any"
            placeholder="请输入起始里程"
            defaultValue={tunnel.opNumStart}
            IconComponent={CurrencyDollarIcon}
          />
          <FormInput
            id="opNumEnd"
            name="opNumEnd"
            label="结束里程"
            type="number"
            step="any"
            placeholder="请输入结束里程"
            defaultValue={tunnel.opNumEnd}
            IconComponent={CurrencyDollarIcon}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {/* 开工日期 */}
          <FormInput
            id="planLaunchDate"
            name="planLaunchDate"
            label="计划始发日期"
            type="date"
            defaultValue={formatDateForInput(tunnel.planLaunchDate)}
            placeholder="输入计划始发日期"
            IconComponent={CurrencyDollarIcon}
          />
          {/* 竣工日期 */}
          <FormInput
            id="planBreakthroughDate"
            name="planBreakthroughDate"
            label="计划贯通日期"
            type="date"
            defaultValue={formatDateForInput(tunnel.planBreakthroughDate)}
            placeholder="输入计划贯通日期"
            IconComponent={CurrencyDollarIcon}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {/* 开工日期 */}
          <FormInput
            id="actualLaunchDate"
            name="actualLaunchDate"
            label="实际始发日期"
            type="date"
            defaultValue={formatDateForInput(tunnel.actualLaunchDate)}
            placeholder="输入实际始发日期"
            IconComponent={CurrencyDollarIcon}
          />
          {/* 竣工日期 */}
          <FormInput
            id="actualBreakthroughDate"
            name="actualBreakthroughDate"
            label="实际贯通日期"
            type="date"
            defaultValue={formatDateForInput(tunnel.actualBreakthroughDate)}
            placeholder="输入实际贯通日期"
            IconComponent={CurrencyDollarIcon}
          />
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/project/subprojects"
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
