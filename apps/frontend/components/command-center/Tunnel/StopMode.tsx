export default function StopMode() {
  return (
    <div className="relative w-24 h-24">
      <svg className="stroke-gray-300 opacity-60" viewBox="0 0 100 100" fill="none">
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

      {/* idle：低亮点 */}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 bg-gray-400 rounded-full opacity-50" />
      </div>
    </div>
  );
}
