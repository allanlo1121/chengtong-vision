import { ArrowLeft } from "lucide-react";
import { fetchOrganizationDetailById } from "@/lib/domain/organization/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DetailItem } from "@/components/detail-item";
import { routes } from "@/lib/core/router/router";
import { ErrorBlock } from "@/components/common/error-block";

export default async function OrganizationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let organizationDetail;

  try {
    organizationDetail = await fetchOrganizationDetailById(id);
  } catch (error: unknown) {
    console.error("Failed to fetch organization detail", error);
    return (
      <ErrorBlock
        message={error instanceof Error ? error.message : "Failed to fetch organization detail"}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" asChild>
          <Link href={routes.organizations.list}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>

        <h1 className="text-xl font-semibold">组织详情</h1>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{organizationDetail.name}</h1>
          <p className="text-muted-foreground">{organizationDetail.code}</p>
        </div>

        <Link href={routes.organizations.edit(id)}>
          <Button>编辑</Button>
        </Link>
      </div>
      基本信息
      <Card>
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          <DetailItem label="组织名称" value={organizationDetail.name} />
          <DetailItem label="组织编码" value={organizationDetail.code} />
          <DetailItem label="组织全称" value={organizationDetail.fullName} />
          <DetailItem label="描述" value={organizationDetail.description} />
        </CardContent>
      </Card>
      {/* 组织关系 */}
      <Card>
        <CardHeader>
          <CardTitle>组织关系</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          <DetailItem label="上级组织" value={organizationDetail.parentOrgName} />
        </CardContent>
      </Card>
      {/* 业务信息 */}
      <Card>
        <CardHeader>
          <CardTitle>业务信息</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          <DetailItem label="组织类型" value={organizationDetail.orgTypeName} />
          <DetailItem label="业务类型" value={organizationDetail.businessName} />
          {/* <DetailItem label="状态" value={organizationDetail.isActive ? "启用" : "停用"} /> */}
        </CardContent>
      </Card>
      {/* 地址信息 */}
      <Card>
        <CardHeader>
          <CardTitle>地址信息</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          <DetailItem label="国家" value={organizationDetail.countryName} />
          <DetailItem label="省份" value={organizationDetail.provinceName} />
          <DetailItem label="城市" value={organizationDetail.cityName} />
          <DetailItem label="区县" value={organizationDetail.districtName} />

          <DetailItem label="地址" value={organizationDetail.address} />

          <DetailItem label="纬度" value={organizationDetail.latitude} />
          <DetailItem label="经度" value={organizationDetail.longitude} />
        </CardContent>
      </Card>
      {/* 系统信息 */}
      <Card>
        <CardHeader>
          <CardTitle>系统信息</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          <DetailItem label="创建时间" value={organizationDetail.createdAt} />
          <DetailItem label="更新时间" value={organizationDetail.updatedAt} />
        </CardContent>
      </Card>
    </div>
  );
}
