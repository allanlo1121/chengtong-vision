"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { Button } from "@frontend/components/ui/button";
import FormInput from "@frontend/components/form-input";
import FormSelect from "@frontend/components/form-select";
import { useRouter } from "next/navigation";
import { createTbmAction } from "@frontend/app/(project-resource)/tbms/create/actions";

import { ActionState } from "@frontend/lib/actions/types";

import { toast } from "sonner";

type Option = {
  value: string;
  label: string;
};

export default function Form({
  tbmTypeOptions,
  manufacturerOptions,
  mechSourceTypeOptions,
  ownerOptions,
}: {
  tbmTypeOptions: Option[];
  manufacturerOptions: Option[];
  mechSourceTypeOptions: Option[];
  ownerOptions: Option[];
}) {
  const router = useRouter();

  const [state, formAction] = useActionState(createTbmAction, {
    success: undefined,
    errors: {},
  });

  useEffect(() => {
    if (state.success === false) {
      toast.error(state.message ?? "创建失败");
    }

    if (state.success === true && state.tbmId) {
      toast.success("盾构创建成功");
      router.push(`/tbms`);
    }
  }, [state, router]);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* tbm Name */}
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            id="tbmName"
            name="tbmName"
            label="盾构机名称"
            type="text"
            required
            placeholder="输入盾构机名称"
            errors={state.errors?.tbmName || []}
          />
          <FormInput
            id="managementNumber"
            name="managementNumber"
            label="管理编号"
            type="text"
            placeholder="输入管理编号"
            errors={state.errors?.managementNumber || []}
          />
          <FormInput
            id="serialNumber"
            name="serialNumber"
            label="序列号"
            type="text"
            placeholder="输入序列号"
            errors={state.errors?.serialNumber || []}
          />
          <FormInput
            id="assetCode"
            name="assetCode"
            label="资产编码"
            type="text"
            placeholder="输入资产编码"
            errors={state.errors?.assetCode || []}
          />
          <FormInput
            id="tbmCode"
            name="tbmCode"
            label="TBM 编号"
            type="text"
            required
            placeholder="输入 TBM 编号"
            errors={state.errors?.tbmCode || []}
          />
          <FormSelect
            id="tbmTypeCode"
            name="tbmTypeCode"
            label="TBM 类型"
            required
            placeholderLabel="选择 TBM 类型"
            options={tbmTypeOptions}
            errors={state.errors?.tbmTypeCode || []}
          />
          <FormSelect
            id="manufacturerSubjectId"
            name="manufacturerSubjectId"
            label="厂家"
            required
            options={manufacturerOptions}
            errors={state.errors?.manufacturerSubjectId || []}
          />
          <FormInput
            id="tbmModel"
            name="tbmModel"
            label="型号"
            type="text"
            placeholder="输入型号"
            errors={state.errors?.tbmModel || []}
          />
          <FormSelect
            id="mechSourceTypeCode"
            name="mechSourceTypeCode"
            label="设备来源"
            required
            placeholderLabel="选择设备来源"
            options={mechSourceTypeOptions}
            errors={state.errors?.mechSourceTypeCode || []}
          />
          <FormSelect
            id="ownerSubjectId"
            name="ownerSubjectId"
            label="所有者"
            required
            placeholderLabel="选择所有者"
            options={ownerOptions}
            errors={state.errors?.ownerSubjectId || []}
          />
          <FormInput
            id="sortOrder"
            name="sortOrder"
            label="排序"
            type="number"
            defaultValue={0}
            placeholder="输入排序值"
            errors={state.errors?.sortOrder || []}
          />
          <FormSelect
            id="isDisabled"
            name="isDisabled"
            label="是否禁用"
            placeholderLabel="选择状态"
            defaultValue="false"
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
            defaultValue="false"
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
