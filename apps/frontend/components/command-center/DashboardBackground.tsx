import { MapPinned } from "lucide-react";

export function DashboardBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#061f45]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* 发光层 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.22),transparent_55%)]" />

      {/* 遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-background/0 to-background/30" />
    </div>
  );
}
