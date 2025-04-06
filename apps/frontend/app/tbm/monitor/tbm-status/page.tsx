import TbmStatusClient from '@/components/tbm/monitor/TbmStatusClient';
import Pie from "@/components/tbm/monitor/pie";

export default function Page() {
  return (
    <div>
      <h1>设备状态</h1>
      <TbmStatusClient />
      <Pie />
    </div>
  );
}
