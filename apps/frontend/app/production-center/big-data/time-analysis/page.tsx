
'use server';

import RingEfficiencyChart from '@/components/production-center/big-data/RingEfficiencyChart';
import SingleDateSearch from '@/components/ui/single-date-search';

export default async function Page({
    searchParams,
}: {
    searchParams?: Promise<{ date?: string }>;
}) {
    const resolvedParams = await searchParams;
    const selectedDate = resolvedParams?.date ? new Date(resolvedParams.date) : undefined;

    return (
        <div className="p-4 space-y-4">
            <SingleDateSearch defaultDate={selectedDate} />
            {/* <RingEfficiencyChart selectedDate={selectedDate} /> */}
        </div>
    );
}
