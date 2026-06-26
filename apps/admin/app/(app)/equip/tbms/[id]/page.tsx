import { ArrowLeft } from "lucide-react";
import { fetchTbmDetailById } from "@/lib/domain/tbm/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DetailItem } from "@/components/detail-item";
import { ErrorBlock } from "@/components/common/error-block";
import { routes } from "@/lib/core/router/router";
import { TbmDetail } from "@/lib/domain/tbm/types";

export default async function TbmDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let tbmDetail: TbmDetail;
  try {
    tbmDetail = await fetchTbmDetailById(id);
  } catch (error) {
    console.error("Error fetching TBM detail:", error);
    return <ErrorBlock message={error instanceof Error ? error.message : "查询失败"} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" asChild>
          <Link href={routes.tbms.list}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>

        <h1 className="text-xl font-semibold">盾构机详情</h1>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{tbmDetail.name}</h1>
          <p className="text-muted-foreground">{tbmDetail.code}</p>
        </div>

        <Link href={routes.tbms.edit(id)}>
          <Button>编辑</Button>
        </Link>
      </div>
      基本信息
      <Card>
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          <DetailItem label="规格型号" value={tbmDetail.model} />
          <DetailItem label="盾构机类型" value={tbmDetail.tbmTypeName} />
          <DetailItem label="制造商" value={tbmDetail.manufacturerName} />
          <DetailItem label="序列号" value={tbmDetail.serialNo} />
          <DetailItem label="直径" value={tbmDetail.diameter} />
          <DetailItem label="功率" value={tbmDetail.power} />
        </CardContent>
      </Card>
      {/* 其他信息 */}
      <Card>
        <CardHeader>
          <CardTitle>其他信息</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          <DetailItem label="排序" value={tbmDetail.sortOrder} />
          <DetailItem label="是否禁用" value={tbmDetail.isDisabled ? "是" : "否"} />
          <DetailItem label="备注" value={tbmDetail.remark} />
        </CardContent>
      </Card>
      {/* 系统信息 */}
      <Card>
        <CardHeader>
          <CardTitle>系统信息</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          <DetailItem label="创建时间" value={tbmDetail.createdAt} />
          <DetailItem label="更新时间" value={tbmDetail.updatedAt} />
        </CardContent>
      </Card>
    </div>
  );
}
