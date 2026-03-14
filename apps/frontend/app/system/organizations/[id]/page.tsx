import { ArrowLeft } from "lucide-react";
import { getOrganizationDetailById } from "@/modules/organization/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DetailItem } from "@/components/detail-item";

export default async function OrganizationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getOrganizationDetailById(id);

  if (!res.success) {
    return <div>{res.message ?? "加载失败"}</div>;
  }

  const org = res.data;
  console.log("OrganizationDetailPage data", org);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" asChild>
          <Link href="/system/organizations">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>

        <h1 className="text-xl font-semibold">组织详情</h1>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{org.name}</h1>
          <p className="text-muted-foreground">{org.code}</p>
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
          <DetailItem label="组织名称" value={org.name} />
          <DetailItem label="组织编码" value={org.code} />
          <DetailItem label="组织全称" value={org.fullName} />
          <DetailItem label="描述" value={org.description} />
        </CardContent>
      </Card>
      {/* 组织关系 */}
      <Card>
        <CardHeader>
          <CardTitle>组织关系</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          <DetailItem label="上级组织" value={org.parentOrgName} />
        </CardContent>
      </Card>
      {/* 业务信息 */}
      <Card>
        <CardHeader>
          <CardTitle>业务信息</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          <DetailItem label="组织类型" value={org.orgTypeName} />
          <DetailItem label="业务类型" value={org.businessName} />
          <DetailItem label="状态" value={org.isActive ? "启用" : "停用"} />
        </CardContent>
      </Card>
      {/* 地址信息 */}
      <Card>
        <CardHeader>
          <CardTitle>地址信息</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          <DetailItem label="国家" value={org.countryName} />
          <DetailItem label="省份" value={org.provinceName} />
          <DetailItem label="城市" value={org.cityName} />
          <DetailItem label="区县" value={org.districtName} />

          <DetailItem label="地址" value={org.address} />

          <DetailItem label="纬度" value={org.latitude} />
          <DetailItem label="经度" value={org.longitude} />
        </CardContent>
      </Card>
      {/* 系统信息 */}
      <Card>
        <CardHeader>
          <CardTitle>系统信息</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          <DetailItem label="创建时间" value={org.createdAt} />
          <DetailItem label="更新时间" value={org.updatedAt} />
        </CardContent>
      </Card>
    </div>
  );
}
