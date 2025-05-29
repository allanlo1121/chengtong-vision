import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useParameterNameMap } from '@/hooks'

function groupDataByField(rawData) {
    const result = {} as Record<string, { ts: string; value: number }[]>;

    rawData.forEach(({ ts, data }) => {
        for (const [key, value] of Object.entries(data)) {
            if (!result[key]) result[key] = [];
            result[key].push({ ts, value });
        }
    });

    return result;
}

export function MultiParamCharts({ rawData }: { rawData: any[] }) {
    console.log('[MultiParamCharts] 原始数据:', rawData);
    const { getNameWithUnit } = useParameterNameMap();

    const grouped = groupDataByField(rawData);
    console.log('[MultiParamCharts] 分组数据:', grouped);

    return (
        <div className="space-y-8">
            {Object.entries(grouped).map(([paramKey, series]) => (
                <div key={paramKey} className="border rounded p-4 shadow">
                    <h3 className="text-lg font-bold mb-2">{getNameWithUnit(paramKey)}</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={series}>
                            <XAxis dataKey="ts" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ))}
        </div>
    );
}
