// app/tbms/[id]/_components/OverviewTab.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { updateTbmAction } from "../actions";
import FormInput from "@frontend/components/form-input";
import FormSelect from "@frontend/components/form-select";
import { TbmForm } from "@frontend/lib/schemas/tbm.schema";
import { Button } from "@frontend/components/ui/button";
import { toast } from "sonner";
type Option = {
  value: string;
  label: string;
};

interface OverviewTabProps {
  id: string;
  tbm: TbmForm;
  tbmTypeOptions: Option[];
  manufacturerOptions: Option[];
  mechSourceTypeOptions: Option[];
  ownerOptions: Option[];
}

export default function OverviewTab({
  id,
  tbm,
  tbmTypeOptions,
  manufacturerOptions,
  mechSourceTypeOptions,
  ownerOptions,
}: OverviewTabProps) {
  const initialState = { success: undefined, errors: {} as Record<string, string[]> };

  // const updateTbmWithId = updateTbmAction.bind(null, id);
  const [state, formAction] = useActionState(updateTbmAction, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success === false) {
      toast.error(state.message ?? "更新失败");
    }

    if (state.success === true && state.tbmId) {
      toast.success("盾构机更新成功");
      router.push(`/tbms`);
    }
  }, [state, router]);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <input type="hidden" name="id" value={id} />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            id="tbmName"
            name="tbmName"
            label="盾构机名称"
            type="text"
            required
            placeholder="输入盾构机名称"
            defaultValue={tbm.tbmName}
            errors={state.errors?.tbmName || []}
          />
          <FormInput
            id="managementNumber"
            name="managementNumber"
            label="管理编号"
            type="text"
            placeholder="输入管理编号"
            defaultValue={tbm.managementNumber ?? ""}
            errors={state.errors?.managementNumber || []}
          />
          <FormInput
            id="serialNumber"
            name="serialNumber"
            label="序列号"
            type="text"
            placeholder="输入序列号"
            defaultValue={tbm.serialNumber ?? ""}
            errors={state.errors?.serialNumber || []}
          />
          <FormInput
            id="assetCode"
            name="assetCode"
            label="资产编码"
            type="text"
            placeholder="输入资产编码"
            defaultValue={tbm.assetCode ?? ""}
            errors={state.errors?.assetCode || []}
          />
          <FormInput
            id="tbmCode"
            name="tbmCode"
            label="TBM 编号"
            type="text"
            required
            placeholder="输入 TBM 编号"
            defaultValue={tbm.tbmCode}
            errors={state.errors?.tbmCode || []}
          />
          <FormSelect
            id="tbmTypeCode"
            name="tbmTypeCode"
            label="TBM 类型"
            required
            placeholderLabel="选择 TBM 类型"
            defaultValue={tbm.tbmTypeCode ?? ""}
            options={tbmTypeOptions}
            errors={state.errors?.tbmTypeCode || []}
          />
          <FormSelect
            id="manufacturerSubjectId"
            name="manufacturerSubjectId"
            label="厂家"
            required
            placeholderLabel="选择厂家"
            defaultValue={tbm.manufacturerSubjectId ?? ""}
            options={manufacturerOptions}
            errors={state.errors?.manufacturerSubjectId || []}
          />
          <FormInput
            id="tbmModel"
            name="tbmModel"
            label="型号"
            type="text"
            disabled
            placeholder="输入型号"
            defaultValue={tbm.tbmModel ?? ""}
          />
          <FormSelect
            id="mechSourceTypeCode"
            name="mechSourceTypeCode"
            label="设备来源"
            required
            placeholderLabel="选择设备来源"
            defaultValue={tbm.mechSourceTypeCode ?? ""}
            options={mechSourceTypeOptions}
            errors={state.errors?.mechSourceTypeCode || []}
          />
          <FormSelect
            id="ownerSubjectId"
            name="ownerSubjectId"
            label="所有者"
            required
            placeholderLabel="选择所有者"
            defaultValue={tbm.ownerSubjectId ?? ""}
            options={ownerOptions}
            errors={state.errors?.ownerSubjectId || []}
          />
          <FormInput
            id="sortOrder"
            name="sortOrder"
            label="排序"
            type="number"
            defaultValue={tbm.sortOrder ?? 0}
            placeholder="输入排序值"
            errors={state.errors?.sortOrder || []}
          />
          <FormSelect
            id="isDisabled"
            name="isDisabled"
            label="是否禁用"
            placeholderLabel="选择状态"
            defaultValue={tbm.isDisabled ? "true" : "false"}
            options={[
              { value: "true", label: "是" },
              { value: "false", label: "否" },
            ]}
            errors={state.errors?.isDisabled || []}
          />
          <FormSelect
            id="deleted"
            name="deleted"
            label="是否删除"
            placeholderLabel="选择状态"
            defaultValue={tbm.deleted ? "true" : "false"}
            options={[
              { value: "true", label: "是" },
              { value: "false", label: "否" },
            ]}
            errors={state.errors?.deleted || []}
          />
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/tbms"
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
