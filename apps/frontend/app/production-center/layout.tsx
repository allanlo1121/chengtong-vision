'use client';
// apps/production-center/layout.tsx
//import { WebSocketProvider } from "@/contexts/WebSocketProvider";
import Topbar from "@/app/ui/topbar";
import SideNav from "@/app/ui/sidenav";
import { TunnelFilterProvider } from "@/contexts/TunnelFilterProvider";
import { ProgressRefreshProvider } from "@/contexts/ProgressRefreshProvider";
import { TunnelRefreshProvider, useTunnelRefresh } from "@/contexts/TunnelRefreshProvider";
import { useInitParameterNameMap } from '@/hooks'

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { tunnelRefreshCount } = useTunnelRefresh(); // ✅ 注意：从内部调用
  useInitParameterNameMap(); // ✅ 初始化参数名称映射

  return (
    <TunnelFilterProvider tunnelRefenshCount={tunnelRefreshCount}>
      <div className="flex h-screen overflow-hidden">
        {/* 侧边栏 */}
        <div className="w-64 flex-shrink-0">
          <SideNav />
        </div>

        {/* 主区域 */}
        <div className="flex flex-col flex-1 w-full h-full border-4 border-yellow-200">
          <Topbar />
          <div className="flex-1 overflow-y-auto w-full border-4 border-b-blue-500 p-4 md:p-6">
            {children}
          </div>
        </div>
      </div>
    </TunnelFilterProvider>
  );
}

export default function ProductionCenterLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProgressRefreshProvider>
      <TunnelRefreshProvider>
        {/* <WebSocketProvider> */}
        <LayoutContent children={children} /> {/* ✅ 调用在内部 */}
        {/* </WebSocketProvider> */}
      </TunnelRefreshProvider>
    </ProgressRefreshProvider>
  );
}
