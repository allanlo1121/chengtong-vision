import { WebSocketProvider } from "@/utils/WebSocketProvider";
import SideNav from "@/app/ui/sidenav";
import Topbar from "@/app/ui/topbar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WebSocketProvider>
      <div className="flex h-screen overflow-hidden">
        {/* 左侧导航 */}
        <div className="w-64 flex-shrink-0">
          <SideNav />
        </div>

        {/* 右侧主内容区 */}
        <div className="flex flex-col flex-1 h-full">
          {/* 顶部栏：无 padding */}
          <Topbar />

          {/* 主体内容区：加 padding */}
          <div className="flex-1 overflow-y-auto p-6 md:p-12">
            {children}
          </div>
        </div>
      </div>
    </WebSocketProvider>
  );
}