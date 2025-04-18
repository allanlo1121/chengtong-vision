"use client";

import React, { useRef, useEffect } from "react";
import { useDataContext } from "../WebSocketProvider";
import { ITbmMainInfo } from "@/lib/tbm/tbmDataTypes";

interface TbmCardProps {
  activatedTbms: ITbmMainInfo[];
}

//: React.FC<TbmCardProps>
export const TbmStatusCard = ({ }) => {
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  // const context = useDataContext();
  // const data = context?.latestData[tbmcode];
  //console.log("tbmcodes", activatedTbms);

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

  // if (!activatedTbms)
  //   return <div className="p-4 border rounded shadow">等待数据...</div>;

  return (
    <div>
      
      
    <div className="w-screen grid grid-cols-4 gap-2 p-4 border rounded shadow space-y-2">
    {/* {activatedTbms.map((tbm) => (
      <div key={tbm.id} className="p-4 border rounded shadow space-y-2">
        <h2 className="text-xl font-semibold">{tbm.name}</h2>
      </div>
    ))} */}
  </div></div>
   
  );
};
