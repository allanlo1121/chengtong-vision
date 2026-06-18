import React from "react";
import { cn } from "@/lib/core/utils";

type ThrustStatus = "advance" | "offline" | "idle" | "warning";

interface Props {
  status: ThrustStatus;
  speed?: number; // only for online
}

export default function ThrustIndicator({ status, speed = 2 }: Props) {
  const isOnline = status === "advance";
  const isOffline = status === "offline";
  const isIdle = status === "idle";
  const isWarning = status === "warning";

  return (
    <div className="relative w-24 h-24">
      <svg
        className={cn(
          "w-24 h-24 transition-all duration-300",
          isOffline && "stroke-red-400 opacity-70",
          isIdle && "stroke-gray-300 opacity-60",
          isOnline && "stroke-green-500",
          isWarning && "stroke-orange-400"
        )}
        viewBox="0 0 100 100"
        fill="none"
      >
        {/* 外圈 */}
        <circle cx="50" cy="50" r="48" strokeWidth="4" />

        {/* 内圈 */}
        <circle cx="50" cy="50" r="14" strokeWidth="2" />

        {/* 主结构线 */}
        <g>
          <line x1="30" y1="50" x2="70" y2="50" />
          <line x1="50" y1="63" x2="50" y2="98" />
          <line x1="37" y1="43" x2="8" y2="26" />
          <line x1="62" y1="57" x2="92" y2="74" />
        </g>

        {/* 在线状态：旋转动画 */}
        {isOnline && (
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur={`${5 / Math.max(speed, 0.1)}s`}
              repeatCount="indefinite"
            />
          </g>
        )}
      </svg>

      {/* ❌ offline：红色 X */}
      {isOffline && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-14 h-14">
            <span className="absolute top-1/2 left-0 w-full h-1 bg-red-500 rotate-45 rounded" />
            <span className="absolute top-1/2 left-0 w-full h-1 bg-red-500 -rotate-45 rounded" />
          </div>
        </div>
      )}

      {/* ⚠ warning：闪烁点 */}
      {isWarning && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
        </div>
      )}

      {/* idle：低亮点 */}
      {isIdle && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-gray-400 rounded-full opacity-50" />
        </div>
      )}
    </div>
  );
}
