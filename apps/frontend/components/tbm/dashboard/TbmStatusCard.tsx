"use client";
import { formatNumber } from "@/utils/tbmData/handleData";
import ThrustMode from "./ThrustMode";
import SegmentBuild from "./SegmentBuild";
import { useDataContext } from "../WebSocketProvider";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import React from "react";

function renderStatusBlock({
  thrustMode,
  segmentMode,
  speed = 0,
}: {
  thrustMode: number;
  segmentMode: number;
  speed?: number; // 可选 + 默认值
}) {
  if (thrustMode) {
    return <ThrustMode speed={speed} />;
  }
  if (segmentMode) {
    return <SegmentBuild />;
  }
  return <div className="text-4xl text-red-500">停机中</div>;
}

//: React.FC<TbmCardProps>
export const TbmStatusCard = ({
  tbmcode,
  tbmName,
  ringEnd,
}: {
  tbmcode: string;
  tbmName: string;
  ringEnd: number;
}) => {
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  //const tbmcode = "crec988";
  console.log("tbmcode", tbmcode);

  const context = useDataContext();
  const data = context?.latestData[tbmcode];
  console.log("context", context);
  console.log(data, "data");
 
  

  if (!data)
    return <div className="p-4 border rounded shadow">等待数据...</div>;

  return (
    <div className=" h-full w-full absolute  top-0 left-0  text-xs text-gray-300">
      <div className="w-full h-28  grid grid-cols-6 gap-1 px-2 py-0">
        <div className="col-span-2 flex flex-col items-center justify-center py-0 border-2">
          <div className="absolute -top-3 px-2 text-base text-amber-100 font-bold leading-5 bg-linear-to-r/srgb from-indigo-500 to-teal-400 rounded-xl border-2 border-primary ">
            {tbmName}
          </div>

          <div className="w-full h-full pt-6 text-center  ">
            <p className="text-left">今日完成</p>
            <span className="text-5xl">
            {Number(data?.s100100008 ?? 0) - Number(data?.s100900001 ?? 0)}
            </span>
            <span>/{data?.s100900011 ?? 0}</span>
          </div>
        </div>
        <div className="col-span-2 border-2 items-center justify-center flex flex-col text-center bg-[url('/logo.svg')]  bg-size-[40px] bg-center bg-no-repeat">
          {renderStatusBlock({
            thrustMode: data.b000000001,
            segmentMode: data.b000000002,
            speed: data.s010109001,
          })}
        </div>
        <div className="col-span-2 flex flex-col text-center border-2 ">
          <p className="text-left">当前环号</p>
          <span className="text-3xl font-bold">{data.s100100008}</span>

          <span className="text-left"> 累计掘进</span>
          {/* <Progress
            className="w-40"
            value={(data.s100100008 / ringEnd) * 100}
          /> */}
          <span className=" text-2xl">
            {formatNumber((data.s100100008 / ringEnd) * 100, 0)}%
          </span>
        </div>
      </div>

      <Table className="w-full text-xs mt-4  ">
        <TableBody>
          <TableRow className="h-6 p-0 m-0 border-0   ">
            <TableCell className="w-2/12 text-center p-0">总推力</TableCell>
            <TableCell className="w-3/12 text-center p-0 text-amber-300">
              {formatNumber(data.s050001001, 0)}
            </TableCell>
            <TableCell className="w-1/12 text-center italic p-0">kN</TableCell>
            <TableCell className="w-2/12 text-center p-0">刀盘扭矩</TableCell>
            <TableCell className="w-3/12 text-center p-0 text-amber-300">
              {formatNumber(data.s010102004, 0)}
            </TableCell>
            <TableCell className="w-1/12 text-center italic p-0 pr-2">
              kNm
            </TableCell>
          </TableRow>
          <TableRow className="h-6 p-0 m-0 border-0 ">
            <TableCell className="w-2/12 text-center p-0">贯入度</TableCell>
            <TableCell className="w-3/12 text-center p-0 text-amber-300">
              {formatNumber(data.s050109001, 2)}
            </TableCell>
            <TableCell className="w-1/12 text-center italic p-0">
              mm/r
            </TableCell>
            <TableCell className="w-2/12 text-center p-0">刀盘转速</TableCell>
            <TableCell className="w-3/12 text-center p-0 text-amber-300">
              {formatNumber(data.s010109001, 2)}
            </TableCell>
            <TableCell className="w-1/12 text-center italic p-0 pr-2">
              r/min
            </TableCell>
          </TableRow>
          <TableRow className="h-6 p-0 m-0 border-0 ">
            <TableCell className="w-2/12 text-center p-0">推进速度</TableCell>
            <TableCell className="w-3/12 text-center p-0 text-amber-300">
              {formatNumber(data.s050009003, 2)}
            </TableCell>
            <TableCell className="w-1/12 text-center italic p-0">
              mm/min
            </TableCell>
            <TableCell className="w-2/12 text-center p-0">现场时间</TableCell>
            <TableCell className="right-2 text-right italic w-4/12  p-0 text-amber-300/60">
              {new Date(data.timestamp).toLocaleString()}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
