import { ArrowLeft } from "lucide-react";
import { fetchProjectDetailById } from "@/lib/domain/project/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { ErrorBlock } from "@/components/common/error-block";

export default async function OrganizationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let projectDetail;
  try {
    projectDetail = await fetchProjectDetailById(id);
  } catch (error) {
    console.error("Failed to fetch project detail:", error);
    return (
      <ErrorBlock
        message={error instanceof Error ? error.message : "Failed to fetch project detail"}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" asChild>
          <Link href="/system/organizations">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>

        <h1 className="text-xl font-semibold">项目详情</h1>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{projectDetail.name}</h1>
          <p className="text-muted-foreground">{projectDetail.code}</p>
        </div>

        <Link href={`/system/organizations/${id}/edit`}>
          <Button>编辑</Button>
        </Link>
      </div>
      基本信息
      <Card>
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          {/* <DetailItem label="组织名称" value={projectDetail.name} />
          <DetailItem label="组织编码" value={projectDetail.code} />
          <DetailItem label="组织全称" value={projectDetail.fullName} />
          <DetailItem label="描述" value={projectDetail.description} /> */}
        </CardContent>
      </Card>
      {/* 组织关系 */}
      <Card>
        <CardHeader>
          <CardTitle>组织关系</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          {/* <DetailItem label="上级组织" value={projectDetail.parentOrgName} /> */}
        </CardContent>
      </Card>
      {/* 业务信息 */}
      <Card>
        <CardHeader>
          <CardTitle>业务信息</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          {/* <DetailItem label="组织类型" value={projectDetail.orgTypeName} />
          <DetailItem label="业务类型" value={projectDetail.businessName} />
          <DetailItem label="状态" value={projectDetail.isActive ? "启用" : "停用"} /> */}
        </CardContent>
      </Card>
      {/* 地址信息 */}
      <Card>
        <CardHeader>
          <CardTitle>地址信息</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          {/* <DetailItem label="国家" value={projectDetail.countryName} />
          <DetailItem label="省份" value={projectDetail.provinceName} />
          <DetailItem label="城市" value={projectDetail.cityName} />
          <DetailItem label="区县" value={projectDetail.districtName} />

          <DetailItem label="地址" value={projectDetail.address} />

          <DetailItem label="纬度" value={projectDetail.latitude} />
          <DetailItem label="经度" value={projectDetail.longitude} />*/}
        </CardContent>
      </Card>
      {/* 系统信息 */}
      <Card>
        <CardHeader>
          <CardTitle>系统信息</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          {/* <DetailItem label="创建时间" value={projectDetail.createdAt} />
          <DetailItem label="更新时间" value={projectDetail.updatedAt} /> */}
        </CardContent>
      </Card>
    </div>
  );
}
