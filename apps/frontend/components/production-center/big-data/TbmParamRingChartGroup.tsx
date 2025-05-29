import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { useParameterNameMap } from '@/hooks'

interface RingDataPoint {
  ring: number
  avg: number
  max: number
}

interface Props {
  data: Record<string, RingDataPoint[]>
}

export function TbmParamRingChartGroup({ data }: Props) {
  const { getNameWithUnit } = useParameterNameMap()
  console.log('[BigData] TbmParamRingChartGroup - 数据:', data);
  

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([code, series]) => (
        <div key={code} className="border rounded p-4 shadow">
          <h3 className="text-lg font-bold mb-2">{getNameWithUnit(code)}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={series}>
              <XAxis dataKey="ring" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avg" stroke="#3b82f6" name="平均值" />
              <Line type="monotone" dataKey="max" stroke="#ef4444" name="最大值" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  )
}
