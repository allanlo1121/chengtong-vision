
import Breadcrumbs from "@/components/ui/breadcrumbs";
import DateSearch from "@/components/ui/date-search";
import { fetchTunnelById } from "@/lib/project/tunnel/data";
import { notFound } from "next/navigation";
import { subDays } from "date-fns";
import ProgressTable from "@/components/production-center/construction-progress/progress-table";
import { fetchFilterTunnelProgressPages } from "@/lib/project/progress/data";
import { Suspense } from "react";
import Pagination from "@/components/ui/pagination";
import {ProgressCreateDialog} from "@/components/production-center/construction-progress/progress-create-dialog";


export default async function Page(props: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ from?: string; to?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const id = params.id;
  const from = searchParams?.from ? new Date(searchParams.from) : undefined;
  const to = searchParams?.to ? new Date(searchParams.to) : undefined;
  const currentPage = Number(searchParams?.page) || 1;
  const tunnelData = await fetchTunnelById(id);


  if (!tunnelData) {
    notFound();
  }
  const totalPages = await fetchFilterTunnelProgressPages(id, {
    from: from,
    to: to,
  });
  const today = new Date();
  const thirtyDaysAgo = subDays(today, 30);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "隧道进度",
            href: "/production-center/construction-progress",
          },
          {
            label: `编辑隧道进度/${tunnelData.shortName}`,
            href: "/production-center/construction-progress/${id}/edit",
            active: true,
          },
        ]}
      />
      {/* <EditProgressForm progressData={progressData} /> */}
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <DateSearch defaultRange={{ startDate: thirtyDaysAgo, endDate: today }} />
        <ProgressCreateDialog
          tunnelId={tunnelData.id}
        />
      </div>
      {/* </div>
             <div className="space-y-4">
        <DatePickerSeparate
          startDate={tunnelData.planLaunchDate}
          endDate={tunnelData.planEndDate}
         
        />
        </div> */}
      <Suspense key={from?.toString() ?? "" + totalPages}>
        <ProgressTable tunnelData={tunnelData} from={from} to={to} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
