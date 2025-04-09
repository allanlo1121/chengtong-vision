'use client'

import React, { useRef, useEffect} from "react";
import { useDataContext } from "./WebSocketProvider";

interface TbmCardProps {
  tbmcodes: string[];
}

export const TbmCard: React.FC<TbmCardProps> = ({ tbmcodes }) => {
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  // const context = useDataContext();
  // const data = context?.latestData[tbmcode];
  console.log("tbmcodes", tbmcodes);
  

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;

  //   const ctx = canvas.getContext("2d");
  //   if (!ctx) return;

  //   ctx.save(); // 保存当前状态

  //   //清空画布
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   const centerX = canvas.width / 2;
  //   const centerY = canvas.height / 2;
  //   const outerRadius = 240;
  //   const innerRadius = 80;

  //   ctx.strokeStyle = "#1E3A8A"; // 深蓝色
  //   ctx.lineWidth = 4;

  //   // 画外圆
  //   ctx.beginPath();
  //   ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
  //   ctx.stroke();

  //   // 画内圆
  //   ctx.beginPath();
  //   ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
  //   ctx.stroke();

  //   // 画主线（上下左右）
  //   for (let angle = 0; angle < 360; angle += 45) {
  //     const radians = (angle * Math.PI) / 180;
  //     const x = centerX + outerRadius * Math.cos(radians);
  //     const y = centerY + outerRadius * Math.sin(radians);
  //     ctx.beginPath();
  //     ctx.moveTo(centerX, centerY);
  //     ctx.lineTo(x, y);
  //     ctx.stroke();
  //   }

  //   ctx.restore(); // 恢复状态
  // }, [data]);

 

  if (!tbmcodes)
    return <div className="p-4 border rounded shadow">等待数据...</div>;

  return (
    <div className="p-4 border rounded shadow space-y-2">
      <h2 className="text-xl font-semibold">{data.tbmcode}</h2>
      <p>环号: {data.s100100008 ?? "-"}</p>
      <p>推力: {data.s050001001 ?? "-"}</p>
      <p>状态: {data.status === 1 ? "运行中" : "暂停/异常"}</p>
      <p className="text-xs text-gray-500">
        更新时间: {new Date(data.timestamp).toLocaleString()}
      </p>
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        className="border-2"
      ></canvas>
    </div>
  );
};
