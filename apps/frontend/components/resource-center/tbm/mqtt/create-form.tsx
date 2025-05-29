"use client";
import {
    CurrencyDollarIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createMqttUser, State } from "@/lib/tbm/mqtt-user/actions";
import FormInput from "@/components/ui/form-input";
import { useActionState } from "react";

export default function CreateMqttUserPage({ tbmCode, tbmId }: { tbmCode: string; tbmId: string }) {

    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(createMqttUser, initialState);

    return (
        <form action={formAction}>
            <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded-xl">
                <h1 className="text-xl font-semibold mb-4">创建 MQTT 用户</h1>

                <div className="space-y-2 text-sm text-gray-700">
                    <FormInput
                        id="username"
                        name="username"
                        label="Mqtt用户名"
                        type="text"
                        defaultValue={tbmCode}
                        readOnly
                        IconComponent={UserCircleIcon}
                    />
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                    <FormInput
                        id="tbmId"
                        name="tbmId"
                        label="TbmId"
                        type="text"
                        defaultValue={tbmId}
                        readOnly
                        IconComponent={UserCircleIcon}
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
            </div>
        </form>
    );
}