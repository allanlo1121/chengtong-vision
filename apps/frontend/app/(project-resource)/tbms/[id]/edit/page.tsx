import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@frontend/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@frontend/components/ui/tabs";
import notFound from "./not-found";
import { fetchTbmById } from "@frontend/lib/repositories/tbm.repository";
import OverviewTab from "./_components/OverviewTab";
import { getSubjectOptions } from "@frontend/lib/services/subject/subject-option";
import { getMasterOptions } from "@frontend/lib/services/master-data/master-option";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  console.log("tbm id", id);

  const tbm = await fetchTbmById(id);

  console.log("tbm", tbm);

  if (!tbm) {
    notFound();
  }

  const tbmTypeOptions = await getMasterOptions("TBM_TYPE");
  const manufacturerOptions = await getSubjectOptions("10810012");
  const mechSourceTypeOptions = await getMasterOptions("MECH_SOURCE_TYPE");
  const ownerOptions = await getSubjectOptions("10810013");

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList>
        <TabsTrigger value="overview">基本信息</TabsTrigger>
        <TabsTrigger value="custody">使用记录</TabsTrigger>
        <TabsTrigger value="maintenance">修理记录</TabsTrigger>
        <TabsTrigger value="remould">改造记录</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <OverviewTab
          id={id}
          tbm={tbm}
          tbmTypeOptions={tbmTypeOptions}
          manufacturerOptions={manufacturerOptions}
          mechSourceTypeOptions={mechSourceTypeOptions}
          ownerOptions={ownerOptions}
        />
      </TabsContent>
      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>
              Track performance and user engagement metrics. Monitor trends and identify growth
              opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Page views are up 25% compared to last month.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports">
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
            <CardDescription>
              Generate and download your detailed reports. Export data in multiple formats for
              analysis.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            You have 5 reports ready and available to export.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Manage your account preferences and options. Customize your experience to fit your
              needs.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Configure notifications, security, and themes.
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
