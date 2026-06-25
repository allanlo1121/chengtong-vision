export default function OfflineMode() {
  return (
    <div className="w-[120px] h-[120px] md:w-[140px] md:h-[140px]">
      <svg
        className="stroke-red-400 opacity-70 w-full h-full"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
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
      </svg>

      {/* ❌ offline：红色 X */}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-14 h-14">
          <span className="absolute top-1/2 left-0 w-full h-1 bg-red-500 rotate-45 rounded" />
          <span className="absolute top-1/2 left-0 w-full h-1 bg-red-500 -rotate-45 rounded" />
        </div>
      </div>
    </div>
  );
}
