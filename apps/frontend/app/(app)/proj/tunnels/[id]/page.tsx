import { ArrowLeft } from "lucide-react";
import { fetchTunnelDetailById } from "@/lib/domain/tunnel/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DetailItem } from "@/components/detail-item";
import { TunnelDetail } from "@/lib/domain/tunnel/types/db.types";
import { ErrorBlock } from "@/components/common/error-block";
import { routes } from "@/lib/core/router/router";

export default async function TunnelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let tunnel: TunnelDetail;
  try {
    tunnel = await fetchTunnelDetailById(id);
  } catch (error: unknown) {
    return <ErrorBlock message={error instanceof Error ? error.message : "查询失败"} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" asChild>
          <Link href={routes.tunnels.list}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>

        <h1 className="text-xl font-semibold">隧道详情</h1>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{tunnel.name}</h1>
          <p className="text-muted-foreground">{tunnel.tunnelStatusName}</p>
        </div>

        <Link href={routes.tunnels.edit(id)}>
          <Button>编辑</Button>
        </Link>
      </div>
      基本信息
      <Card>
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          <DetailItem label="所在机构" value={tunnel.organizationName} />
          <DetailItem label="项目名称" value={tunnel.projectName} />

          <DetailItem label="描述" value={tunnel.remark} />
        </CardContent>
      </Card>
      {/* 组织关系 */}
      <Card>
        <CardHeader>
          <CardTitle>区间规格</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          <DetailItem label="起始环" value={tunnel.startRing} />
          <DetailItem label="结束环" value={tunnel.endRing} />
          <DetailItem label="起始里程" value={tunnel.startChainage} />
          <DetailItem label="结束里程" value={tunnel.endChainage} />
        </CardContent>
      </Card>
      {/* 工期信息 */}
      <Card>
        <CardHeader>
          <CardTitle>工期信息</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          <DetailItem label="实际开始日期" value={tunnel.actualStartDate} />
          <DetailItem label="实际结束日期" value={tunnel.actualEndDate} />
          <DetailItem label="计划开始日期" value={tunnel.scheduleStartDate} />
          <DetailItem label="计划结束日期" value={tunnel.scheduleEndDate} />
        </CardContent>
      </Card>
      {/* 地址信息 */}
      <Card>
        <CardHeader>
          <CardTitle>地质信息</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          <DetailItem label="地质情况" value={tunnel.geology} />
        </CardContent>
      </Card>
      {/* 系统信息 */}
      <Card>
        <CardHeader>
          <CardTitle>系统信息</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          <DetailItem label="创建时间" value={tunnel.createdAt} />
          <DetailItem label="更新时间" value={tunnel.updatedAt} />
        </CardContent>
      </Card>
    </div>
  );
}
