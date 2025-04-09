"use client";
import {
  createSectorInfo,
  drawArcDataBlock,
} from "@/utils/canvas/drawDataBlock";

import {
  drawMainInterface,
  drawItemTable,
} from "@/utils/canvas/drawMainInterface";

import React, { useRef, useEffect } from "react";
import { ITbmDataItem, ITbmScreenProps } from "@/lib/tbm/tbmDataTypes";
import { useDataContext } from "../WebSocketProvider";

export const ThrustScreen: React.FC<ITbmScreenProps> = ({
  tbmcode,
  tbmInfo,
  subProject,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const context = useDataContext(); // 获取数据上下文
  const data = context?.latestData[tbmcode]; // 获取最新数据

  useEffect(() => {
    // if (!data) return; // 如果数据不存在，直接返回
    console.log("tbmData", data); // 打印数据
    console.log("tbmInfo", tbmInfo); // 打印 TBM 信息
    console.log("subProject", subProject); // 打印子项目数据

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const thrustData = [
      { name: "总推力", value: data?.s050001001 ?? "-", unit: "kN" },
      { name: "推进泵", value: data?.s300101001 ?? "-", unit: "bar" },
      { name: "推进速度", value: data?.s050009003 ?? "-", unit: "mm/min" },
      { name: "贯入度", value: data?.s050109001 ?? "-", unit: "mm/r" },
      { name: "扭矩", value: data?.s010102004 ?? "-", unit: "kN·m" },
    ];

    // console.log("ctx", ctx.getTransform()); // 打印当前变换矩阵

    //清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //  console.log("清空画面");
    ctx.save(); // 保存当前状态
    ctx.translate(canvas.width / 2, canvas.height / 2); // 将原点移到中心

    const r = (canvas.width / 2) * 0.9; // 半径

    const areaLabels = ["A区", "B区", "C区", "D区", "E区", "F区", "G区", "H区"]; // 区域名称
    const { thrustAreaNumber: sectorNum, earthPressureNumber: epNum } = tbmInfo; // 获取推进区间数和土压区间数
    const thrustCylinderData = [
      [
        { name: "位移", value: data?.s050006006 ?? "-", unit: "mm" },
        { name: "压力", value: data?.s050001019 ?? "-", unit: "bar" },
      ],
      [
        { name: "位移", value: data?.s050006008 ?? "-", unit: "mm" },
        { name: "压力", value: data?.s050001020 ?? "-", unit: "bar" },
      ],
      [
        { name: "位移", value: data?.s050006005 ?? "-", unit: "mm" },
        { name: "压力", value: data?.s050001021 ?? "-", unit: "bar" },
      ],
      [
        { name: "位移", value: data?.s050006007 ?? "-", unit: "mm" },
        { name: "压力", value: data?.s050001022 ?? "-", unit: "bar" },
      ],
      [
        { name: "位移", value: data?.s050006009 ?? "-", unit: "mm" },
        { name: "压力", value: data?.s050001023 ?? "-", unit: "bar" },
      ],
      [
        { name: "位移", value: data?.s050006010 ?? "-", unit: "mm" },
        { name: "压力", value: data?.s050001024 ?? "-", unit: "bar" },
      ],
    ];

    // 绘制主界面
    const sectorInfos = drawMainInterface(ctx, sectorNum, r, 0.64, areaLabels);

    // 绘制推进油缸数据块
    if (!sectorInfos) return; // 如果没有扇形信息，直接返回
    for (let i = 0; i < sectorNum; i++) {  
      drawArcDataBlock(ctx, thrustCylinderData[i], sectorInfos[i]); // 绘制数据块
    }

    //绘制土仓压力数据
    const rLabel2 = r * 0.64 * 0.9; // 距离中心的半径

    const earthPressureData: ITbmDataItem[] = [
      { name: "1#", value: data?.s020901006 ?? "-", unit: "bar" },
      { name: "2#", value: data?.s020901005 ?? "-", unit: "bar" },
      { name: "3#", value: data?.s020901004 ?? "-", unit: "bar" },
      { name: "4#", value: data?.s020901003 ?? "-", unit: "bar" },
      { name: "5#", value: data?.s020901001 ?? "-", unit: "bar" },
      { name: "6#", value: data?.s020901002 ?? "-", unit: "bar" },
      { name: "7#", value: data?.s020901015 ?? "-", unit: "bar" },
    ];

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
      drawArcDataBlock(ctx, earthPressureData[j], sector2Info); // 绘制数据块
    }
    // 绘制推进主要数据
    drawItemTable(ctx, thrustData, r, 200, 32);
    ctx.translate(-canvas.width / 2, -canvas.height / 2); // 将原点移到中心
  }, [data]);

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
};
