// runtime/_components/TbmMqttCard.tsx

"use client";

import { Wifi, WifiOff, ShieldCheck, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tbm } from "@/lib/domain/tbm/types";
import { MqttUserDetail } from "@/lib/domain/tbm-runtime/types";

export function TbmMqttCard({ tbm, mqtt }: { tbm: Tbm; mqtt: MqttUserDetail }) {
  // =========================================
  // Ready
  // =========================================

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle>MQTT</CardTitle>

          <CardDescription>MQTT 连接与 Topic 配置</CardDescription>
        </div>

        <Badge variant={mqtt.status?.isOnline ? "default" : "secondary"} className="gap-1">
          {mqtt.status?.isOnline ? (
            <Wifi className="h-3.5 w-3.5" />
          ) : (
            <WifiOff className="h-3.5 w-3.5" />
          )}

          {mqtt.status?.isOnline ? "在线" : "离线"}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ====================================== */}
        {/* Info */}
        {/* ====================================== */}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">用户名</div>

            <div className="flex items-center gap-2 text-sm font-medium">
              <User className="h-4 w-4 text-muted-foreground" />

              {mqtt.user.username}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">状态</div>

            <div className="flex items-center gap-2 text-sm font-medium">
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />

              {mqtt.user.isEnabled ? "已启用" : "已禁用"}
            </div>
          </div>
        </div>

        {/* ====================================== */}
        {/* Topic */}
        {/* ====================================== */}

        <div className="space-y-3">
          <div className="text-xs text-muted-foreground">Topic Prefix</div>

          <div className="rounded-lg border bg-muted/40 p-3 font-mono text-sm">
            {mqtt.user.topicPrefix}
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <div>
              Publish：
              <span className="ml-2 font-mono text-foreground">{mqtt.user.topicPrefix}/up/#</span>
            </div>

            <div>
              Subscribe：
              <span className="ml-2 font-mono text-foreground">{mqtt.user.topicPrefix}/down/#</span>
            </div>
          </div>
        </div>

        {/* ====================================== */}
        {/* Last Seen */}
        {/* ====================================== */}

        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">最近连接时间</div>

          <div className="text-sm">{mqtt.status?.connectedAt ?? "-"}</div>
        </div>

        {/* ====================================== */}
        {/* Actions */}
        {/* ====================================== */}

        <div className="flex flex-wrap gap-2 pt-2">
          <Button variant="outline" size="sm">
            重置密码
          </Button>

          <Button variant="outline" size="sm">
            同步 ACL
          </Button>

          <Button variant="outline" size="sm">
            查看 ACL
          </Button>

          <Button variant="destructive" size="sm">
            禁用
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// export function TbmMqttEmptyCard({ tbm }: { tbm: Tbm }) {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>MQTT</CardTitle>

//         <CardDescription>MQTT 用户尚未初始化</CardDescription>
//       </CardHeader>

//       <CardContent className="flex flex-col gap-4">
//         <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
//           当前 TBM 尚未创建 MQTT 用户与 ACL 配置。
//         </div>

//         <div className="flex items-center gap-2">
//           <Button onClick={() => createMqttUserAction({ tbmId: tbm.id, tbmCode: tbm.code })}>
//             创建 MQTT 用户
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

export function TbmMqttErrorCard({ error }: { error: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>MQTT</CardTitle>
        <CardDescription>MQTT 用户信息加载失败</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="rounded-lg border border-dashed p-6 text-sm text-destructive">{error}</div>
        <div className="flex items-center gap-2">
          <Button onClick={() => location.reload()}>重试</Button>
        </div>
      </CardContent>
    </Card>
  );
}
