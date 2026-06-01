// "use client";

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Tbm } from "@/lib/domain/tbm/types";
// import { createMqttUserFormAction } from "@/lib/domain/tbm-runtime/actions";
// import { generateMqttInitialPassword } from "@/lib/domain/tbm-runtime/utils/password";

// export function TbmMqttEmptyCard({ tbm }: { tbm: Tbm }) {
//   const username = tbm.code;
//   const password = generateMqttInitialPassword();

//   const aclRules = [
//     {
//       permission: "allow",
//       action: "publish",
//       topic: `chengtong/${tbm.code}/up/#`,
//     },
//     {
//       permission: "allow",
//       action: "subscribe",
//       topic: `chengtong/${tbm.code}/down/#`,
//     },
//     {
//       permission: "deny",
//       action: "all",
//       topic: "#",
//     },
//   ];

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>初始化 MQTT 用户</CardTitle>
//         <CardDescription>当前 TBM 尚未创建 MQTT 用户与 ACL 配置，请确认后初始化。</CardDescription>
//       </CardHeader>

//       <CardContent>
//         <form action={createMqttUserFormAction} className="flex flex-col gap-6">
//           <input type="hidden" name="tbmId" value={tbm.id} />
//           <input type="hidden" name="tbmCode" value={tbm.code} />
//           <input type="hidden" name="userType" value="tbm" />
//           <input type="hidden" name="isEnabled" value="true" />
//           <input type="hidden" name="isSuperuser" value="false" />

//           <div className="grid gap-4 md:grid-cols-2">
//             <div className="space-y-2">
//               <label className="text-sm font-medium">盾构机编号</label>
//               <Input value={tbm.code} readOnly />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium">默认用户名</label>
//               <Input name="username" value={username} readOnly />
//             </div>

//             <div className="space-y-2 md:col-span-2">
//               <label className="text-sm font-medium">初始密码</label>
//               <Input name="password" value={password} readOnly />
//               <p className="text-xs text-muted-foreground">
//                 请保存该初始密码，创建后系统不会再次显示明文密码。
//               </p>
//             </div>
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-medium">主题前缀</label>
//             <Input name="topicPrefix" value={`chengtong/${tbm.code}`} readOnly />
//           </div>

//           <div className="space-y-3">
//             <div className="text-sm font-medium">默认 ACL 规则</div>

//             <div className="overflow-hidden rounded-lg border">
//               <table className="w-full text-sm">
//                 <thead className="bg-muted">
//                   <tr>
//                     <th className="px-3 py-2 text-left font-medium">权限</th>
//                     <th className="px-3 py-2 text-left font-medium">动作</th>
//                     <th className="px-3 py-2 text-left font-medium">Topic</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {aclRules.map((rule, index) => (
//                     <tr key={index} className="border-t">
//                       <td className="px-3 py-2">{rule.permission}</td>
//                       <td className="px-3 py-2">{rule.action}</td>
//                       <td className="px-3 py-2 font-mono text-xs">{rule.topic}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           <div className="flex justify-end">
//             <Button type="submit">确认创建 MQTT 用户</Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }
