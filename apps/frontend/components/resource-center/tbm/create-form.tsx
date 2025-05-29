"use client";

import {
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/form-input";
import { useActionState } from "react";
import FormSelect from "@/components/ui/form-select";
import { createTbm, State } from "@/lib/tbm/actions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ITbmOwner, ITbmProducer, ITbmType } from "@/lib/tbm/types";



export default function Form({
  producers,
  owners,
  types,
}: {
  producers: ITbmProducer[];
  owners: ITbmOwner[];
  types: ITbmType[];
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createTbm, initialState);

  // console.log("producers", producers);
  // console.log("owner", owners);
  // console.log("types", types);
  const router = useRouter();
  console.log("当前state默认值：", state);

  useEffect(() => {
    if (!state) return;
    console.log("当前state变化：", state);
    if (!state.success) {
      if (state.message) toast.error(state.message);
      return;
    }

    // 普通成功提示
    toast.success(state.message);

    if (
      state.createMqttUser &&
      state.tbmId &&
      state.tbmCode
    ) {
      console.log("创建 MQTT 用户");
      toast("盾构机创建成功！是否现在创建 MQTT 用户？", {
        duration: Infinity, // ✅ 不会自动消失
        className: "w-200 h-100 bg-gray-100 text-gray-800",
        action: {
          label: "立即创建",
          onClick: () => {
            router.push(
              `/resource-center/tbm/mqtt/create?tbmId=${state.tbmId}&tbmCode=${state.tbmCode}`
            );
          },
        },
      });
    }
  }, [state]);


  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* tbm Name */}
        <FormInput
          id="name"
          name="name"
          label="盾构机名称"
          type="text"
          placeholder="输入盾构机名称"
          defaultValue={state.formValues?.name ?? ""}
          errors={state.errors?.name || []}
          IconComponent={UserCircleIcon}
        />

        <FormInput
          id="code"
          name="code"
          label="盾构机代码"
          type="text"
          placeholder="输入盾构机代码"
          defaultValue={state.formValues?.code ?? ""}
          errors={state.errors?.code || []}
          IconComponent={UserCircleIcon}
        />

        <FormSelect
          id="typeId"
          name="typeId"
          label="盾构机类型"
          options={types.map((type) => ({
            value: String(type.id),
            label: type.name,
          }))}
          defaultValue={state.formValues?.typeId ?? ""}
          errors={state.errors?.typeId || []}
          IconComponent={CurrencyDollarIcon}

        />

        <FormInput
          id="diameter"
          name="diameter"
          label="盾构机直径"
          type="number"
          placeholder="输入盾构机直径"
          defaultValue={state.formValues?.diameter ?? ""}
          errors={state.errors?.diameter || []}
          IconComponent={UserCircleIcon}
        />

        <FormInput
          id="segmentOuter"
          name="segmentOuter"
          label="管片外径"
          type="number"
          placeholder="输入管片外径"
          defaultValue={state.formValues?.segmentOuter ?? ""}
          IconComponent={UserCircleIcon}
        />

        <FormSelect
          id="producerId"
          name="producerId"
          label="生产厂家"
          options={[
            { value: "", label: "未知" },   // ✅ 设置为 "" 而不是 "0"
            ...producers.map((p) => ({ value: p.id, label: p.name }))
          ]}
          defaultValue={state.formValues?.producerId ?? ""}
          IconComponent={CurrencyDollarIcon}
        />
        <FormInput
          id="productionDate"
          name="productionDate"
          label="生产日期"
          type="date"
          defaultValue={new Date().toISOString().split("T")[0]}
          placeholder="输入生产日期"
          IconComponent={CurrencyDollarIcon}
        />
        <div className="grid grid-cols-2 gap-4">
          {/* tbm*/}
          <FormSelect
            id="ownerId"
            name="ownerId"
            label="拥有者"
            options={owners.map((owner) => ({
              value: owner.id,
              label: owner.name,
            }))}
            defaultValue={state.formValues?.ownerId ?? ""}
            IconComponent={CurrencyDollarIcon}
          />{" "}
          <FormInput
            id="geo"
            name="geo"
            label="适应地质"
            type="text"
            placeholder="输入适应地质"
            defaultValue={state.formValues?.geo ?? ""}
            IconComponent={UserCircleIcon}
          />
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <input
            id="createMqttUser"
            name="createMqttUser"
            type="checkbox"
            defaultChecked={true}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="createMqttUser" className="text-sm text-gray-700">
            创建 MQTT 用户
          </label>
        </div>

        {/* 备注 */}
        <FormInput
          id="remark"
          name="remark"
          label="备注"
          type="text"
          placeholder="输入备注"
          IconComponent={CurrencyDollarIcon}
        />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/resource-center/tbm"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          取消
        </Link>
        <Button type="submit">提交</Button>
      </div>
    </form>
  );
}
