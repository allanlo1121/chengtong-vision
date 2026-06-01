import { MapPinned } from "lucide-react";

// components/dashboard/DashboardMap.tsx
interface TbmMapPoint {
  id: string;
  name: string;
  left: number;
  top: number;
  status?: "advancing" | "assembly" | "stopped" | "fault";
}

interface DashboardMapProps {
  points?: TbmMapPoint[];
}

export function DashboardMap({ points = [] }: DashboardMapProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 全国地图 + 辅助线 */}
      <svg viewBox="0 0 900 640" className="h-full w-full opacity-70">
        <path
          d="M188 210L250 160L330 148L395 105L462 122L528 95L598 135L662 128L716 170L760 235L738 310L775 375L712 425L682 488L610 515L548 492L482 535L408 508L350 535L282 488L238 420L172 390L150 315L188 210Z"
          className="fill-sky-500/10 stroke-sky-300/50"
          strokeWidth="2"
        />
        {/* 可加辅助线路/path */}
      </svg>

      {/* 盾构机点位 */}
      {points.map((point) => (
        <div
          key={point.id}
          className="absolute rounded-lg border border-blue-400/30 bg-black/50 px-3 py-1 text-xs text-white shadow-lg backdrop-blur"
          style={{ left: `${point.left}%`, top: `${point.top}%` }}
        >
          {point.name}
        </div>
      ))}
    </div>
  );
}
