// import * as React from "react";
// import { AlertTriangle, MapPinned } from "lucide-react";
// import { CompanyAdvanceStatsPanel } from "./CompanyAdvanceStatsPanel";
// import { TbmDeviceStatusPanel } from "./TbmDeviceStatusPanel";
// import { Panel } from "./panel";
// import { DashboardMapBackground } from "./DashboardMapBackground";

// export function CommandCenterDashboard() {
//   const points = [
//     { id: "1", name: "CT-01号盾构", left: 18, top: 28 },
//     { id: "2", name: "CT-02号盾构", left: 32, top: 46 },
//     { id: "3", name: "CT-03号盾构", left: 46, top: 64 },
//     { id: "4", name: "CT-04号盾构", left: 60, top: 34 },
//     { id: "5", name: "CT-05号盾构", left: 74, top: 52 },
//   ];

//   return (
//     <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
//       <DashboardMapBackground points={points} />

//       <div className="relative z-10 grid gap-4 p-4 xl:grid-cols-12">
//         <div className="space-y-4 xl:col-span-4">
//           <CompanyAdvanceStatsPanel
//             totalDistance={12345.6}
//             avgDistance={411.5}
//             totalRing={2856}
//             avgRing={95}
//           />

//           <TbmDeviceStatusPanel advancing={18} assembly={6} stopped={3} fault={1} />
//         </div>

//         <div className="hidden xl:col-span-4 xl:block" />

//         <div className="space-y-4 xl:col-span-4">
//           <Panel title="告警信息" icon={AlertTriangle}>
//             <div className="text-sm text-muted-foreground">暂无严重告警</div>
//           </Panel>

//           <Panel title="项目概况" icon={MapPinned}>
//             <div className="text-sm text-muted-foreground">项目 / 区间 / 设备汇总</div>
//           </Panel>
//         </div>
//       </div>
//     </div>
//   );
// }
