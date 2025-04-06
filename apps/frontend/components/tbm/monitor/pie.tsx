"use client";
import {
  createSectorInfo,
  drawDataBlock,
  drawArcDataBlock,
} from "@/utils/canvas/drawDataBlock";
import { IPosition, ISectorInfo, IBoxConfig } from "@/lib/canvas/canvasTypes";
import { drawMainInterface } from "@/utils/canvas/drawMainInterface";

import React, { useRef, useEffect } from "react";
import { ITbmDataItem } from "@/lib/tbm/tbmDataTypes";
import { tbmData01 } from "@/lib/tbm/tbm-data";

export default function Pie() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    //清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const r = (canvas.width / 2) * 0.95; // 半径

    const areaLabels = ["A区", "B区", "C区", "D区", "E区", "F区", "G区", "H区"]; // 区域名称
    const { thrustAreaNumber, earthPressNumber } = tbmData01; // 获取推进区间数和土压区间数
    const sectorNum = thrustAreaNumber;

    ctx.translate(canvas.width / 2, canvas.height / 2); // 将原点移到中心
    ctx.save(); // 保存当前状态

    drawMainInterface(ctx, sectorNum, r, 0.64, areaLabels); // 绘制主界面
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
