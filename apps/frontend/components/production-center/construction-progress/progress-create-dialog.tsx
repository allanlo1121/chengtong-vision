"use client";

import { useActionState, useTransition } from "react";
import { createTunnelProgressDataAction } from "@/lib/project/progress/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export function ProgressCreateDialog({
    tunnelId,    
}: {
    tunnelId: string;    
}) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [state, formAction] = useActionState(createTunnelProgressDataAction, {
        success: false,
    });

    useEffect(() => {
        if (state.success) {
            toast.success("进度已创建 ✅");
            setOpen(false);
            startTransition(() => router.refresh());
        }
    }, [state.success]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default">新建进度</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>新建日掘进记录</DialogTitle>
                    <DialogDescription>填写并提交该天的进度信息</DialogDescription>
                </DialogHeader>
                <form
                    action={(formData) => {
                        startTransition(() => formAction(formData));
                    }}
                    className="space-y-4"
                >
                    <input type="hidden" name="tunnel_id" value={tunnelId} />
                    <div className="grid grid-cols-3 w-full max-w-sm items-center gap-1.5">
                        <Label className="col-span-1">日期</Label>
                        <Input
                            name="progress_at"
                            type="date"
                            required
                            className="col-span-2"
                            defaultValue={format(new Date(), "yyyy-MM-dd")} // 默认今天
                        />
                    </div>

                    <div className="grid grid-cols-3 w-full max-w-sm items-center gap-1.5">
                        <Label className="col-span-1">计划环数</Label>
                        <Input
                            name="plan_ring_count"
                            type="number"
                            min="0"
                            placeholder="计划环数"
                            className="col-span-2"
                        />
                    </div>
                    <div className="grid grid-cols-3 w-full max-w-sm items-center gap-1.5">
                        <Label className="col-span-1">开始环号</Label>
                        <Input
                            name="ring_start"
                            type="number"
                            placeholder="开始环号"
                            className="col-span-2"
                        />
                    </div>
                    <div className="grid grid-cols-3 w-full max-w-sm items-center gap-1">
                        <Label className="col-span-1">结束环号</Label>
                        <Input
                            name="ring_end"
                            type="number"
                            placeholder="结束环号"
                            className="col-span-2"
                        />
                    </div>
                    <div className="grid grid-cols-3 w-full max-w-sm items-center gap-1.5">
                        <Label className="col-span-1">开始里程</Label>
                        <Input
                            name="op_num_start"
                            type="number"
                            step="0.001"
                            placeholder="开始里程"
                            className="col-span-2"
                        />
                    </div>
                    <div className="grid grid-cols-3 w-full max-w-sm items-center gap-1.5">
                        <Label className="col-span-1">结束里程</Label>
                        <Input
                            name="op_num_end"
                            type="number"
                            step="0.001"
                            placeholder="结束里程"
                            className="col-span-2"
                        />
                    </div>

                    {state?.errors && (
                        <div className="text-sm text-red-500">
                            {Object.entries(state.errors).map(([key, messages]) => (
                                <p key={key}>
                                    {key}: {(messages as string[]).join(", ")}
                                </p>
                            ))}
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? "创建中..." : "创建记录"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
