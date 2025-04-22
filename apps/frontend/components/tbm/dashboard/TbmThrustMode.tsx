"use client";

import { useEffect, useRef } from "react";
import { animate, type JSAnimation } from "animejs";

interface RotatingSVGProps {
  speed: number; // r/s
}

function getCurrentRotation(el: HTMLElement): number {
  const transform = getComputedStyle(el).transform;
  if (transform === "none") return 0;

  const matrix = new DOMMatrix(transform);
  const angle = Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI));
  return angle < 0 ? angle + 360 : angle;
}

const TbmThrustMode: React.FC<RotatingSVGProps> = ({ speed }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<JSAnimation | null>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    // 获取当前角度
    const currentAngle = getCurrentRotation(el);

    // 停止之前的动画
    if (animationRef.current) {
      animationRef.current.pause();
    }

    // 创建新动画，从当前角度开始，到 current + 360
    animationRef.current = animate(".logo", {
      rotate: [currentAngle, currentAngle + 360],
      duration: (1 / Math.abs(speed)) * 10000,
      ease: "linear",
      loop: true,
    });
  }, [speed]);

  return (
    <div
      ref={wrapperRef}
      style={{
        width: 100,
        height: 100,
        transformOrigin: "center",
      }}
    >
      <svg
        className="logo"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <rect width="100" height="100" fill="none" />
          <g filter="url(#filter0_d_3345_824)">
            <circle
              cx="50"
              cy="50"
              r="49"
              stroke="#1E3A8A"
              strokeWidth="2"
              shapeRendering="crispEdges"
            />
          </g>
          <g>
            <circle
              cx="50"
              cy="50"
              r="14"
              stroke="#1E3A8A"
              strokeWidth="2"
              shapeRendering="crispEdges"
            />
          </g>
          <line
            y1="-0.5"
            x2="35"
            y2="-0.5"
            transform="matrix(0 -1 -1 0 49.5 35)"
            stroke="#1E3A8A"
          />
          <line
            y1="-0.5"
            x2="10"
            y2="-0.5"
            transform="matrix(-1 0 0 1 55 6.00146)"
            stroke="#1E3A8A"
          />
          <line
            y1="-0.5"
            x2="10"
            y2="-0.5"
            transform="matrix(-1 0 0 1 55 10.0015)"
            stroke="#1E3A8A"
          />
          <line
            y1="-0.5"
            x2="10"
            y2="-0.5"
            transform="matrix(-1 0 0 1 55 14.0015)"
            stroke="#1E3A8A"
          />
          <line
            y1="-0.5"
            x2="10"
            y2="-0.5"
            transform="matrix(-1 0 0 1 55 18.0015)"
            stroke="#1E3A8A"
          />
          <line x1="50" y1="63" x2="50" y2="98" stroke="#1E3A8A" />
          <line x1="55" y1="92.4985" x2="45" y2="92.4985" stroke="#1E3A8A" />
          <line x1="55" y1="88.4985" x2="45" y2="88.4985" stroke="#1E3A8A" />
          <line x1="55" y1="84.4985" x2="45" y2="84.4985" stroke="#1E3A8A" />
          <line x1="55" y1="80.4985" x2="45" y2="80.4985" stroke="#1E3A8A" />
          <line
            x1="37.8105"
            y1="43.1698"
            x2="7.49966"
            y2="25.6698"
            stroke="#1E3A8A"
          />
          <line
            x1="9.76425"
            y1="32.7505"
            x2="14.7643"
            y2="24.0902"
            stroke="#1E3A8A"
          />
          <line
            x1="13.2291"
            y1="34.7505"
            x2="18.2291"
            y2="26.0902"
            stroke="#1E3A8A"
          />
          <line
            x1="16.693"
            y1="36.7505"
            x2="21.693"
            y2="28.0902"
            stroke="#1E3A8A"
          />
          <line
            x1="20.1568"
            y1="38.7505"
            x2="25.1568"
            y2="30.0902"
            stroke="#1E3A8A"
          />
          <line
            y1="-0.5"
            x2="35"
            y2="-0.5"
            transform="matrix(0.866025 -0.5 -0.5 -0.866025 61.9395 42.7368)"
            stroke="#1E3A8A"
          />
          <line
            y1="-0.5"
            x2="10"
            y2="-0.5"
            transform="matrix(-0.5 -0.866025 -0.866025 0.5 89.8027 33.0005)"
            stroke="#1E3A8A"
          />
          <line
            y1="-0.5"
            x2="10"
            y2="-0.5"
            transform="matrix(-0.5 -0.866025 -0.866025 0.5 86.3379 35.0005)"
            stroke="#1E3A8A"
          />
          <line
            y1="-0.5"
            x2="10"
            y2="-0.5"
            transform="matrix(-0.5 -0.866025 -0.866025 0.5 82.874 37.0005)"
            stroke="#1E3A8A"
          />
          <line
            y1="-0.5"
            x2="10"
            y2="-0.5"
            transform="matrix(-0.5 -0.866025 -0.866025 0.5 79.4102 39.0005)"
            stroke="#1E3A8A"
          />
          <line
            x1="62.5"
            y1="57.3302"
            x2="92.8109"
            y2="74.8302"
            stroke="#1E3A8A"
          />
          <line
            x1="90.5463"
            y1="67.7495"
            x2="85.5463"
            y2="76.4098"
            stroke="#1E3A8A"
          />
          <line
            x1="87.0815"
            y1="65.7495"
            x2="82.0815"
            y2="74.4098"
            stroke="#1E3A8A"
          />
          <line
            x1="83.6176"
            y1="63.7495"
            x2="78.6176"
            y2="72.4098"
            stroke="#1E3A8A"
          />
          <line
            x1="80.1537"
            y1="61.7495"
            x2="75.1537"
            y2="70.4098"
            stroke="#1E3A8A"
          />
          <line
            y1="-0.5"
            x2="35"
            y2="-0.5"
            transform="matrix(-0.866025 0.5 0.5 0.866025 38.0605 57.7632)"
            stroke="#1E3A8A"
          />
          <line
            y1="-0.5"
            x2="10"
            y2="-0.5"
            transform="matrix(0.5 0.866025 0.866025 -0.5 10.1973 67.4995)"
            stroke="#1E3A8A"
          />
          <line
            y1="-0.5"
            x2="10"
            y2="-0.5"
            transform="matrix(0.5 0.866025 0.866025 -0.5 13.6621 65.4995)"
            stroke="#1E3A8A"
          />
          <line
            y1="-0.5"
            x2="10"
            y2="-0.5"
            transform="matrix(0.5 0.866025 0.866025 -0.5 17.126 63.4995)"
            stroke="#1E3A8A"
          />
          <line
            y1="-0.5"
            x2="10"
            y2="-0.5"
            transform="matrix(0.5 0.866025 0.866025 -0.5 20.5898 61.4995)"
            stroke="#1E3A8A"
          />
          <line x1="30" y1="50" x2="70" y2="50" stroke="#1E3A8A" />
        </g>
      </svg>
    </div>
  );
};

export default TbmThrustMode;
