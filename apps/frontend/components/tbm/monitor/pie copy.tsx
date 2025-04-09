"use client";
import {
  createSectorInfo,
  drawDataBlock,
  drawArcDataBlock,
} from "@/utils/canvas/drawDataBlock";
import { IPosition, ISectorInfo, IBoxConfig } from "@/lib/canvas/canvasTypes";

import React, { useRef, useEffect } from "react";
import { ITbmDataItem } from "@/lib/tbm/tbmDataTypes";

export default function Pie() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const thrustData = [
      { name: "总推力", value: 10000, unit: "kN" },
      { name: "推进泵", value: 180, unit: "bar" },
      { name: "推进速度", value: 12, unit: "mm/min" },
      { name: "贯入度", value: 3.8, unit: "mm/r" },
      { name: "扭矩", value: 2188, unit: "kN·m" },
    ];
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    //清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const r0 = (canvas.width / 2) * 0.96; // 半径
    const num = 4; // 划分区域数
    const areaLabels = ["A区", "B区", "C区", "D区", "E区", "F区", "G区", "H区"]; // 区域名称

    ctx.translate(canvas.width / 2, canvas.height / 2); // 将原点移到中心
    ctx.save(); // 保存当前状态

    const r1 = r0 * 0.65; // 距离中心的半径
    const rLabel = (r0 + r1) / 2; // 距离中心的半径
    const sectorInfos: ISectorInfo[] = [];

    //绘制推进主界面
    for (let i = 0; i < num; i++) {
      ctx.save(); // 保存当前状态
   
      // 计算每个扇形的角度范围
      const angleStep = (2 * Math.PI) / num;
      const offset = Math.PI / num; // 偏移角度，比如让第一个扇形从 45° 开始

      // 起始角度，加上偏移量，使第一个扇形不从最上面开始
      const angleStart = -Math.PI / 2 + i * angleStep + offset; // -90°是最上面，增加偏移

      // 结束角度
      const angleEnd = angleStart + angleStep;
      // 颜色根据 i 生成 HSL（彩虹渐变）
      ctx.fillStyle = `hsl(${(i / num) * 360}, 80%, 90%)`;

      ctx.beginPath();
      ctx.moveTo(0, 0); // 从中心开始
      ctx.arc(0, 0, r0, angleStart, angleEnd); // 画圆弧
      ctx.closePath();
      ctx.fill();
      //  console.log(`第 ${i} 个扇形的起始角度为：${angleStart}，结束角度为：${angleEnd}`);

      ctx.beginPath(); // 开始路径
      ctx.moveTo(0, 0); // 从中心开始
      ctx.arc(0, 0, r0, angleStart, angleEnd); // 画圆弧
      ctx.strokeStyle = `hsl(${(i / num) * 360}, 80%, 60%)`; // 边框颜色
      ctx.lineWidth = 5; // 边框宽度
      ctx.stroke(); // 绘制边框
      


      // 保存几何信息
      const info = createSectorInfo(i, angleStart, angleEnd, r0, r1 / r0);
      // 如果是第一个扇形（即 i == 0），把它放到最后

      sectorInfos.push(info); // 第一个扇形添加到最后

      if (angleEnd > Math.PI / 2 && angleEnd < (3 / 2) * Math.PI) {
        // console.log(`第 ${i} 个扇形结束角度为：${angleEnd}`);
        const x =
          Math.cos(angleEnd - (angleEnd - angleStart) / num / 1.5) * rLabel;
        const y =
          Math.sin(angleEnd - (angleEnd - angleStart) / num / 1.5) * rLabel;
        ctx.font = "24px sans-serif";
        ctx.fillStyle = "#000";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center"; // 文字右对齐
        ctx.fillText(areaLabels[i], x, y);
      } else {
        const x =
          Math.cos(angleStart + (angleEnd - angleStart) / num / 1.5) * rLabel;
        const y =
          Math.sin(angleStart + (angleEnd - angleStart) / num / 1.5) * rLabel;

        ctx.font = "24px sans-serif";
        ctx.fillStyle = "#000";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center"; // 文字右对齐
        ctx.fillText(areaLabels[i], x, y); // 绘制文字



   
      }
      const xEnd = Math.cos(angleEnd) * r0; // 结束点X坐标
      const yEnd = Math.sin(angleEnd) * r0; // 结束点Y坐标

      ctx.beginPath(); // 开始路径
      ctx.moveTo(0, 0); // 从中心开始
      ctx.lineTo(xEnd, yEnd); // 画线到结束点
      ctx.strokeStyle = "#fff"; // 边框颜色
      ctx.lineWidth = 5; // 边框宽度
      ctx.stroke(); // 绘制边框
      ctx.closePath(); // 关闭路径

      ctx.restore(); // 恢复坐标系，确保不影响后续扇形
    }

    ctx.fillStyle = "#999"; // 文字颜色
    ctx.beginPath(); // 开始路径
    ctx.moveTo(0, 0); // 从中心开始
    ctx.arc(0, 0, r1, 0, Math.PI * 2); // 画圆弧
    ctx.closePath();
    ctx.fill(); // 填充颜色

    //绘制推进油缸数据
    for (let i = 0; i < num; i++) {
      const strokeData: ITbmDataItem[] = [
        { name: "位移", value: 1000, unit: "mm" },
        { name: "压力", value: 100, unit: "bar" },
      ];

      drawArcDataBlock(ctx, strokeData, sectorInfos[i]); // 绘制数据块
    }

    const rLabel2 = r1 * 0.8; // 距离中心的半径

    const earthPressureData: ITbmDataItem[] = [
      { name: "1#", value: 100, unit: "bar" },
      { name: "2#", value: 100, unit: "bar" },
      { name: "3#", value: 100, unit: "bar" },
      { name: "4#", value: 100, unit: "bar" },
      { name: "5#", value: 100, unit: "bar" },
      { name: "6#", value: 100, unit: "bar" },
      { name: "7#", value: 100, unit: "bar" }
      
    ];

    const epNum = earthPressureData.length; // 土仓压力数据个数
    //绘制土仓压力值
    for (let j = 0; j < epNum; j++) {      

      const baseAngle = -Math.PI / 2; // 从12点钟方向开始
      const delta = (2 * Math.PI) / epNum;

      const theta = baseAngle - delta * (epNum - 1 - j);
     
      const sector2Info = createSectorInfo(
        j, // 扇形索引
        theta, // 起始角度
        theta + delta, // 结束角度
        rLabel2, // 半径
        0.92 // 比例（如果有）
      );
       drawArcDataBlock(ctx, earthPressureData[j],sector2Info); // 绘制数据块
    }

    //绘制推进主要数据

    ctx.moveTo(0, 0); // 从中心开始
    ctx.strokeRect(-100, -120, 200, 240); // 画圆弧
    ctx.strokeStyle = "#000"; // 边框颜色
    ctx.stroke(); // 绘制边框
    const length = thrustData.length;
    const totalHeight = 240;
    const rectHeight = totalHeight / length;
    const baseY = -totalHeight / 2; // 从 -100 开始

    thrustData.forEach((data, index) => {
      ctx.save();

      // 计算 y 坐标，确保每个块等高排列，贴合 strokeRect 边框
      const cx = -100;
      const cy = baseY + index * rectHeight;

      ctx.strokeStyle = "red";
      ctx.strokeRect(cx, cy, 200, rectHeight);

      ctx.translate(cx + 100, cy + rectHeight / 2); // 平移坐标系到矩形中心

      drawDataBlock(ctx, data); // 居中放文字

      ctx.restore();
    });
  }, []);

  return (
    <div className="border border-amber-400">
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        className="border-2"
      ></canvas>
    </div>
  );
}
