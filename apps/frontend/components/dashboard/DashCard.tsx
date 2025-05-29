// components/dashboard/DashCard.tsx
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DashCardProps {
  title: string;
  value: number | string;
  subLabel?: string;
  icon?: React.ComponentType<{ className?: string }>; 
  iconColor?: string;
  bgColor?: string;
  borderColor?: string;
  percentage?: number;
  highlight?: boolean;
  footer?: React.ReactNode;
}

export function DashCard({
  title,
  value,
  subLabel,
  icon: Icon,
  iconColor = "text-gray-500",
  bgColor = "bg-white",
  borderColor = "border-gray-300",
  percentage,
  highlight,
  footer,
}: DashCardProps) {
  return (
    <Card className={`w-full h-full py-2 ${bgColor} ${borderColor} border-4 gap-1`}>
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <CardTitle className="text-md font-semibold text-gray-700">{title}</CardTitle>
        {Icon && <Icon className={`text-xl ${iconColor}`} />}
      </CardHeader>

      <CardContent className="flex flex-col justify-end items-center pt-0 -mt-1 ">
        <div className="flex items-center justify-end gap-1">
          <p
            className={`text-5xl font-bold leading-none ${
              highlight ? "text-red-600" : "text-gray-900"
            }`}
          >
            {value}
          </p>
          {subLabel && (
            <p className="text-xl font-bold leading-none text-gray-500">{subLabel}</p>
          )}
        </div>

          {typeof percentage === "number" ? (
    <>
      <div className="flex items-end justify-end text-xs text-gray-500 mb-1">
        <span>完成度</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded">
        <div
          className={`h-full rounded ${highlight ? "bg-red-500" : "bg-green-500"}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </>
  ) : (
    <div className="h-6" /> // 占位空 footer 行
  )}

        {footer && <div className="w-full">{footer}</div>}
      </CardContent>
    </Card>
  );
}
