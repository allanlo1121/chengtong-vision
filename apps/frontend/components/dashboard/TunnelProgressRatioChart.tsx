'use client'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  LabelList,
} from "recharts";

interface TunnelProgress {
    label: string;
    total: number;
    completed: number;
    percentage: number;
}

export default function TunnelProgressRatioChart({ data=[], loading }: { data?: TunnelProgress[], loading: boolean }) {

    console.log("data", data);
    console.log("data_loading", loading);



    if (loading && data.length === 0) return <div className="text-sm text-gray-500">加载中...</div>;
    //   if (error) return <div className="text-sm text-red-500">加载失败：{error.message}</div>;

    return (
        <div className="space-y-2">
            {/* {data.map((tunnel) => (
                <div key={tunnel.label} className="border rounded p-2">
                    <div className="font-medium">{tunnel.label}</div>
                    <div className="text-sm text-gray-500">
                        已完成 {tunnel.completed} / {tunnel.total} 环 ({tunnel.percentage}%)
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded mt-1 overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all"
                            style={{ width: `${tunnel.percentage}%` }}
                        />
                    </div>
                </div>
            ))} */}

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />       

        <Bar dataKey="completed" name="完成环数" fill="#82ca9d">
          <LabelList dataKey="completed" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>


        </div>
    );
}