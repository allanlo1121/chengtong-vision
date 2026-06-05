import {
  TunnelRuntimeCardData,
  phaseLabelMap,
  statusClassMap,
} from "@/lib/domain/command-center/types";
import React from "react";
import Link from "next/link";

import SegmentBuild from "./SegmentBuild";
import TbmThrustMode from "./ThrustMode";

export function TunnelRuntimeCard({ data }: { data: TunnelRuntimeCardData }) {
  const progress = data.totalRing > 0 ? (data.currentRing / data.totalRing) * 100 : 0;

  return (
    <Link href={`/workspace/tunnels/${data.tunnelId}`} className="block">
      <div className="@container aspect-[16/9] overflow-hidden h-full grid grid-rows-[56px_1fr_88px] rounded-2xl bg-white/80 shadow-xl backdrop-blur-[2px]">
        {/* Header */}
        <div className="border-b border-slate-200 px-5 py-4">
          <div className="truncate text-lg font-bold text-slate-900">
            {data.projectName} · {data.tunnelName} · {data.tbmName}
          </div>
        </div>

        {/* Body */}
        <div className="grid  grid-cols-5 border-4 border-blue-200">
          {/* 左侧进度 */}
          <div className=" col-span-2 flex flex-col items-center justify-center border-r border-slate-200 px-4">
            <div
              className="
              relative
              flex
              size-24
              @md:size-32
              @lg:size-40
              @xl:size-48
              items-center
              justify-center"
            >
              {/* 环形进度 */}
              <svg className="absolute inset-0" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="6" />

                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${progress * 2.64} 264`}
                  transform="rotate(-90 50 50)"
                />
              </svg>

              <div className="z-10 text-center">
                <div
                  className="
                  text-3xl
                  @md:text-5xl
                  @lg:text-5xl
                  @xl:text-6xl
                  font-black text-blue-600"
                >
                  {data.currentRing}
                </div>
                <div className="text-1xl font-bold text-slate-700">/{data.totalRing}</div>
              </div>
            </div>
          </div>

          {/* 右侧状态 */}
          <div className="col-span-3  flex items-center justify-center overflow-hidden">
            <div className="scale-125 @md:scale-125 @lg:scale-125 @xl:scale-175">
              {data.phaseType === "assembly" ? <SegmentBuild /> : <TbmThrustMode />}
            </div>
          </div>
        </div>
        {/* Footer */}

        <div className="w-full px-4 grid grid-cols-4  ">
          <div className=" col-span-1  border-slate-200 ">
            <div className="mt-2 pl-2 text-xs @md:text-xs @lg:text-base @xl:text-lg text-slate-500 border-l-2">
              掌子面里程
            </div>

            <div className="text-base font-bold text-slate-900">K12+345.6</div>
          </div>
          <div className=" col-span-1 border-slate-200">
            <div className="mt-2 pl-2 text-xs @md:text-xs @lg:text-base @xl:text-lg text-slate-500 border-l-2">
              当前地质
            </div>

            <div className="text-base font-bold text-slate-900">微风化花岗岩</div>
          </div>

          <div className=" col-span-1  border-slate-200 ">
            <div className="mt-2  pl-2 text-xs @md:text-xs @lg:text-base @xl:text-lg text-slate-500 border-l-2">
              当前风险
            </div>

            <div className="text-base font-bold text-slate-900">无</div>
          </div>
          <div className=" col-span-1 border-slate-200 ">
            <div className="mt-2 pl-2  text-xs @md:text-xs @lg:text-base @xl:text-lg text-slate-500 border-l-2">
              下个风险/120米
            </div>

            <div className="text-base font-bold text-slate-900">断层破碎带</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
