"use client"

import { useActionState, useTransition } from "react"
import { updateTunnelProgressDataAction } from "@/lib/project/progress/actions"
import { ITunnelProgressData } from "@/lib/project/progress/types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState } from "react"

export function ProgressEditDialog({ progress }: { progress: ITunnelProgressData }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition() // ⏳
  const [state, formAction] = useActionState(updateTunnelProgressDataAction, {
    success: false,
  })

  // ✅ 成功处理：关闭、提示、刷新
  if (state.success) {
    toast.success("进度更新成功 ✅")
    setOpen(false)
    startTransition(() => router.refresh())
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">编辑</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form
          action={(formData) => {
            startTransition(() => formAction(formData))
          }}
          className="space-y-4"
        >
          <input type="hidden" name="id" value={progress.id} />

          <Input
            name="ring_start"
            type="number"
            defaultValue={progress.ring_start ?? ""}
            placeholder="起始环号"
          />
          <Input
            name="ring_end"
            type="number"
            defaultValue={progress.ring_end ?? ""}
            placeholder="结束环号"
          />
          <Input
            name="op_num_start"
            type="number"
            step="0.001"
            defaultValue={progress.op_num_start ?? ""}
            placeholder="起始里程"
          />
          <Input
            name="op_num_end"
            type="number"
            step="0.001"
            defaultValue={progress.op_num_end ?? ""}
            placeholder="结束里程"
          />

          {state?.errors && (
            <div className="text-sm text-red-500">
              {Object.entries(state.errors).map(([key, messages]) => (
                <p key={key}>{key}: {(messages as string[]).join(", ")}</p>
              ))}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? "保存中..." : "保存"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
