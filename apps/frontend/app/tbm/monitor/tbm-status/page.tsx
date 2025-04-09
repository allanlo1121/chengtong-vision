import TbmStatusClient from "@/components/tbm/monitor/TbmStatusClient";
import Pie from "@/components/tbm/monitor/ThrustScreen";

export default function Page() {
  return (
    <div className="bg-[#E0E0E0]">
      <h1>设备状态</h1>
      <TbmStatusClient />
      <Pie />
    </div>
  );
}
