// (app)/layout.tsx

import { Providers } from "@/app/providers";

import { LayoutContent } from "./_components/layout-content";
import { fetchMenusByCode } from "@/lib/domain/system/navigation/service";
import { BreadcrumbProvider } from "@/components/layout/breadcrumb-context";
import { notFound } from "next/dist/client/components/not-found";
import { queryRuntimeUser } from "@/lib/domain/system/services/query";
import { AppContextType } from "@/lib/domain/system/appContext/types";
import {
  fetchBreadcrumbLabelMaps,
  fetchEntityNameByPath,
} from "@/lib/domain/system/breadcrumb/service";
import { BreadcrumbLabelMap } from "@/lib/domain/system/breadcrumb/types";
import { TunnelWorkspaceProvider } from "@/providers/workspace/TunnelWorkspaceProvider";
import {
  fetchTunnelWorkspaceDetail,
  listAccessibleTunnelScopes,
  listTunnelWorkspaceScopesByOrganizations,
} from "@/lib/domain/tunnel/services/query.service";

export default async function TunnelWorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log("TunnelWorkspaceLayout params", { id });

  if (!id || id === "undefined") {
    notFound();
  }
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
    const menus = await fetchMenusByCode("tunnel_workspace");
    const breadcrumbLabelMap = await fetchBreadcrumbLabelMaps();

    const entityLabelMap = await fetchEntityNameByPath("tunnels", id);

    const breadcrumbMap: BreadcrumbLabelMap = {
      ...breadcrumbLabelMap,
      ...entityLabelMap,
    };

    const scope = await fetchTunnelWorkspaceDetail(id);

    const tunnelOptions = await listAccessibleTunnelScopes(runtimeUser.organizationIds);

    console.log("Tunnel Workspace Scope:", scope);
    console.log("Accessible Tunnel Scopes:", tunnelOptions);

    return (
      <Providers runtimeUser={runtimeUser} appContext={appContext} menus={menus}>
        <TunnelWorkspaceProvider scope={scope} tunnelOptions={tunnelOptions}>
          <BreadcrumbProvider breadcrumbMap={breadcrumbMap}>
            <LayoutContent>{children}</LayoutContent>
          </BreadcrumbProvider>
        </TunnelWorkspaceProvider>
      </Providers>
    );
  } catch (error) {
    console.error("SystemLayout error", error);

    return <div className="flex h-screen items-center justify-center">系统初始化失败</div>;
  }
}
