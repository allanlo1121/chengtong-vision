import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { iconMap } from "./config/dashboardCards";

export function DashCard({
  title,
  value,
  type,
  bgColor = "bg-white",
  borderColor = "border-gray-300",
  
}: {
  title: string;
  value: number;
  type: keyof typeof iconMap;
  bgColor?: string;
  borderColor?: string;
  icon?: React.ReactNode;
}) {
    const Icon = iconMap[type];
  return (
    <Card className={`w-full h-full py-2 ${bgColor} ${borderColor} border-4`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md">{title}</CardTitle>
        {Icon && <Icon className="text-xl" />}
      </CardHeader>
      <CardContent className="mx-auto">
        <p className="text-4xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}



// export default async function CardWrapper() {
//   const {
//     numberOfInvoices,
//     numberOfCustomers,
//     totalPaidInvoices,
//     totalPendingInvoices,
//   } = await fetchCardData();

//   return (
//     <>
//       <DashCard title="Collected" value={totalPaidInvoices}  />
//       <DashCard title="Pending" value={totalPendingInvoices}  />
//       <DashCard title="Total Invoices" value={numberOfInvoices}  />
//       <DashCard
//         title="Total Customers"
//         value={numberOfCustomers}
      
//       />
//     </>
//   );
// }