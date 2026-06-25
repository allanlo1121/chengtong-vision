"use client";

import { useEffect, useRef } from "react";
import { createScope, animate, stagger } from "animejs";

const SEGMENTS = 6;
const STEP = 360 / SEGMENTS;

export default function SegmentBuildMode({ segmentNumber = SEGMENTS }: { segmentNumber?: number }) {
  const root = useRef<HTMLDivElement | null>(null);
  const scope = useRef<any>(null);

  useEffect(() => {
    if (!root.current) return;

    scope.current = createScope({ root: root.current }).add(() => {
      const segments = ".segment";

      // 🔥 工业级 timeline（关键）
      animate(segments, {
        rotate: (el, i) => (i ?? 0) * STEP - 90,
        scale: 1,
        opacity: 1,
        duration: 1000,
        delay: stagger(1000),
        ease: "out(3)",
        loop: true,

        // 👉 关键：18s cycle（6 * 3s）
        loopDelay: 1200,

        alternate: false,
      });

      // reset animation（第二段 timeline）
      // animate(segments, {
      //   rotate: -90,
      //   duration: 5000,
      //   delay: stagger(100),
      //   autoplay: false,
      // });
    });

    return () => scope.current?.revert();
  }, []);

  return (
    <div ref={root} className="w-[140px] h-[140px]">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="49" stroke="#1E3A8A" strokeWidth={4} fill="none" />

        <g>
          {Array.from({ length: segmentNumber }).map((_, i) => (
            <g
              key={i}
              className="segment"
              style={{
                transformOrigin: "50px 50px",
                opacity: 0.15,
                transform: "rotate(0deg) scale(0.85)",
              }}
            >
              <path
                d={`
                    M 74.5 92.43524478543749
                    A 49 49 0 0 1 25.50000000000001 92.4352447854375
                    L 30.000000000000007 84.64101615137756
                    A 40 40 0 0 0 70 84.64101615137754
                    Z
                `}
                fill="#ECDEDE"
                stroke="#1E3A8A"
                strokeWidth="0.5"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
