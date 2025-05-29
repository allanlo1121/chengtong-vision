import {
  Bell,
  Clock,
  LayoutDashboard,
  Search,
  Star,
  Sun,
} from "lucide-react";
import ProjectRegionSelector from "@/components/ProjectRegionSelector";
import TunnelFilterBar from "@/components/ui/TunnelFilterBar";

export default function Topbar() {
  return (
    <div className="flex justify-between items-center h-12 px-4 bg-white shadow-sm border-b">
      {/* 左侧路径 + 选择器 */}
      <div className="flex items-center space-x-6">
        {/* 导航路径 */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <LayoutDashboard size={16} />
          <Star size={16} className="text-gray-400" />
          <span className="text-gray-400">Dashboards</span>
          <span className="text-gray-300">/</span>
          <span className="text-black font-medium">Default</span>
        </div>

        {/* 筛选器插入这里 */}
        {/* <ProjectRegionSelector /> */}
        <TunnelFilterBar />
      </div>

      {/* 右侧图标区域 */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center bg-gray-100 rounded px-2 text-sm text-gray-500">
          <Search size={14} className="mr-1" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-24 placeholder-gray-400"
          />
          <span className="mx-2 text-gray-300">/</span>
        </div>
        <Sun size={16} className="text-gray-600 cursor-pointer" />
        <Clock size={16} className="text-gray-600 cursor-pointer" />
        <Bell size={16} className="text-gray-600 cursor-pointer" />
        <LayoutDashboard size={16} className="text-gray-600 cursor-pointer" />
      </div>
    </div>
  );
}
