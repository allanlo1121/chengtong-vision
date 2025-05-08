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

  console.log("producers", producers);
  console.log("owner", owners);
  console.log("types", types);

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
          errors={state.errors?.name || []}
          IconComponent={UserCircleIcon}
        />

        <FormInput
          id="code"
          name="code"
          label="盾构机代码"
          type="text"
          placeholder="输入盾构机代码"
          IconComponent={UserCircleIcon}
        />

        <FormSelect
          id="typeId"
          name="typeId"
          label="盾构机类型"
          options={types.map((type) => ({
            value: type.id,
            label: type.name,
          }))}
          defaultValue=""
          IconComponent={CurrencyDollarIcon}
        />

        <FormInput
          id="diameter"
          name="diameter"
          label="盾构机直径"
          type="number"
          placeholder="输入盾构机直径"
          IconComponent={UserCircleIcon}
        />

        <FormInput
          id="segmentOuter"
          name="segmentOuter"
          label="管片外径"
          type="number"
          placeholder="输入管片外径"
          IconComponent={UserCircleIcon}
        />

        <FormSelect
          id="producerId"
          name="producerId"
          label="生产厂家"
          options={producers.map((producer) => ({
            value: producer.id.toString(),
            label: producer.name,
          }))}
          defaultValue=""
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
              value: owner.id.toString(),
              label: owner.name,
            }))}
            IconComponent={CurrencyDollarIcon}
          />{" "}
          <FormInput
            id="geo"
            name="geo"
            label="适应地质"
            type="text"
            placeholder="输入适应地质"
            IconComponent={UserCircleIcon}
          />
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
