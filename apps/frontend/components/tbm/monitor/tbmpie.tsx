"use client";

import { drawInterface } from "@/utils/canvas/drawMainInterface";

import React, { useRef, useEffect } from "react";

import { tbmData01 } from "@/lib/tbm/tbm-data";

export default function Tbmpie(tbm) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    //清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const r = (canvas.width / 2) * 0.9; // 半径

    const { thrustAreaNumber: sectorNum } = tbmData01; // 获取推进区间数和土压区间数

    ctx.translate(canvas.width / 2, canvas.height / 2); // 将原点移到中心
    ctx.save(); // 保存当前状态

    let i: number = 0; // 在外部声明并初始化 i
    drawInterface(ctx, sectorNum, r, i);
    // 绘制主界面
    setInterval(() => {
      i = i + 1;
      drawInterface(ctx, sectorNum, r, i);
    }, 10000); // 每秒更新一次
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
