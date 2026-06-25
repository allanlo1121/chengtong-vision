"use client";

import { useEffect, useRef } from "react";
import { createScope, animate } from "animejs";

export default function ThrustMode({ speed = 2 }: { speed?: number }) {
  const root = useRef<HTMLDivElement | null>(null);
  const scope = useRef<any>(null);

  useEffect(() => {
    if (!root.current) return;

    scope.current = createScope({ root: root.current }).add(() => {
      animate(".thrust-group", {
        rotate: "+=360",
        duration: 5000 / Math.abs(speed),
        ease: "linear",
        loop: true,
      });
    });

    return () => scope.current?.revert();
  }, [speed]);

  return (
    <div ref={root} className="w-[120px] h-[120px] md:w-[140px] md:h-[140px]">
      <svg className="stroke-slate-900 w-full h-full" viewBox="0 0 100 100" fill="none">
        <defs>
          <radialGradient id="radialShade">
            <stop offset="0%" stopColor="rgba(0,0,0,0.05)" />
            <stop offset="60%" stopColor="rgba(0,0,0,0.15)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
          </radialGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="48"
          strokeWidth="4"
          fill="hsl(214.99, 22.59%, 64.5%)"
          opacity="0.95"
        />
        <circle cx="50" cy="50" r="14" strokeWidth="2" />

        {/* 🔥 只控制这一层 */}
        <g
          className="thrust-group"
          style={{
            transformOrigin: "50px 50px",
          }}
        >
          {/* 你的所有 line 原样保留 */}
          <line x1="50" y1="63" x2="50" y2="98" />
          <line x1="55" y1="92.5" x2="45" y2="92.5" />
          <line x1="55" y1="88.5" x2="45" y2="88.5" />
          <line x1="55" y1="84.5" x2="45" y2="84.5" />
          <line x1="55" y1="80.5" x2="45" y2="80.5" />

          <line x1="37.8105" y1="43.1698" x2="7.49966" y2="25.6698" />
          <line x1="9.76425" y1="32.7505" x2="14.7643" y2="24.0902" />
          <line x1="13.2291" y1="34.7505" x2="18.2291" y2="26.0902" />
          <line x1="16.693" y1="36.7505" x2="21.693" y2="28.0902" />
          <line x1="20.1568" y1="38.7505" x2="25.1568" y2="30.0902" />

          <line x1="62.5" y1="57.3302" x2="92.8109" y2="74.8302" />
          <line x1="90.5463" y1="67.7495" x2="85.5463" y2="76.4098" />
          <line x1="87.0815" y1="65.7495" x2="82.0815" y2="74.4098" />
          <line x1="83.6176" y1="63.7495" x2="78.6176" y2="72.4098" />
          <line x1="80.1537" y1="61.7495" x2="75.1537" y2="70.4098" />

          <line y1="-0.5" x2="35" y2="-0.5" transform="matrix(0 -1 -1 0 49.5 35)" />
          <line y1="-0.5" x2="10" y2="-0.5" transform="matrix(-1 0 0 1 55 6.00146)" />
          <line y1="-0.5" x2="10" y2="-0.5" transform="matrix(-1 0 0 1 55 10.0015)" />
          <line y1="-0.5" x2="10" y2="-0.5" transform="matrix(-1 0 0 1 55 14.0015)" />
          <line y1="-0.5" x2="10" y2="-0.5" transform="matrix(-1 0 0 1 55 18.0015)" />

          <line
            y1="-0.5"
            x2="35"
            y2="-0.5"
            transform="matrix(0.866025 -0.5 -0.5 -0.866025 61.9395 42.7368)"
          />
          <line
            y1="-0.5"
            x2="10"
            y2="-0.5"
            transform="matrix(-0.5 -0.866025 -0.866025 0.5 89.8027 33.0005)"
          />
          <line
            y1="-0.5"
            x2="10"
            y2="-0.5"
            transform="matrix(-0.5 -0.866025 -0.866025 0.5 86.3379 35.0005)"
          />
          <line
            y1="-0.5"
            x2="10"
            y2="-0.5"
            transform="matrix(-0.5 -0.866025 -0.866025 0.5 82.874 37.0005)"
          />
          <line
            y1="-0.5"
            x2="10"
            y2="-0.5"
            transform="matrix(-0.5 -0.866025 -0.866025 0.5 79.4102 39.0005)"
          />
          <line
            y1="-0.5"
            x2="35"
            y2="-0.5"
            transform="matrix(-0.866025 0.5 0.5 0.866025 38.0605 57.7632)"
          />
          <line
            y1="-0.5"
            x2="10"
            y2="-0.5"
            transform="matrix(0.5 0.866025 0.866025 -0.5 10.1973 67.4995)"
          />
          <line
            y1="-0.5"
            x2="10"
            y2="-0.5"
            transform="matrix(0.5 0.866025 0.866025 -0.5 13.6621 65.4995)"
          />
          <line
            y1="-0.5"
            x2="10"
            y2="-0.5"
            transform="matrix(0.5 0.866025 0.866025 -0.5 17.126 63.4995)"
          />
          <line
            y1="-0.5"
            x2="10"
            y2="-0.5"
            transform="matrix(0.5 0.866025 0.866025 -0.5 20.5898 61.4995)"
          />

          {/* 其余结构全部保留 */}
          <line x1="30" y1="50" x2="70" y2="50" />
        </g>
      </svg>
    </div>
  );
}
