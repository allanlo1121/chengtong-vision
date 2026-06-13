// (app)/layout.tsx

import { Providers } from "@/app/providers";

import { LayoutContent } from "@/components/layout/layout-content";
import { fetchMenusByCode } from "@/lib/domain/system/navigation/service";

import { queryRuntimeUser } from "@/lib/domain/system/services/query";

import { AppContextType } from "@/lib/domain/system/appContext/types";
import { BreadcrumbProvider } from "@/components/layout/breadcrumb-context";
import { BreadcrumbLabelMap } from "@/lib/domain/system/breadcrumb/types";

import { fetchBreadcrumbLabelMaps } from "@/lib/domain/system/breadcrumb/service";

export const dynamic = "force-dynamic";

export default async function SystemLayout({ children }: { children: React.ReactNode }) {
  try {
    // Runtime User
    const runtimeUser = await queryRuntimeUser();

    console.log("Runtime User:", runtimeUser);

    const appContext: AppContextType = {
      user: {
        name: runtimeUser.name,
        email: undefined,
        avatarUrl: undefined,
      },
      teams: [
        { id: "team-1", name: "城通公司", logo: "TrainFrontTunnel", type: "公司" },
        { id: "team-2", name: "技术管理部", logo: "TrainFrontTunnel", type: "部门" },
      ],
      favoriteProjects: runtimeUser.favoriteProjects,
    };

    console.log("App Context:", appContext);

    // Menus
    const menus = await fetchMenusByCode("global");
    const breadcrumbLabelMap = await fetchBreadcrumbLabelMaps();

    // const entityLabelMap = await fetchEntityNameByPath("tunnels", id);

    const breadcrumbMap: BreadcrumbLabelMap = {
      ...breadcrumbLabelMap,
      // ...entityLabelMap,
    };

    return (
      <Providers runtimeUser={runtimeUser} appContext={appContext} menus={menus}>
        <BreadcrumbProvider breadcrumbMap={breadcrumbMap}>
          <LayoutContent>{children}</LayoutContent>
        </BreadcrumbProvider>
      </Providers>
    );
  } catch (error) {
    console.error("SystemLayout error", error);

    return <div className="flex h-screen items-center justify-center">系统初始化失败</div>;
  }
}
