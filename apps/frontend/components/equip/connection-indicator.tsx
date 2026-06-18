import { useMemo } from "react";

type ConnectionIndicatorProps = {
  status: boolean; // heartbeatIsOnline
  lastSeen: string; // ISO string
  staleThresholdMs?: number; // 默认 90s
  size?: number;
  showText?: boolean;
};

type ConnectionStatus = "online" | "offline" | "stale";

function getConnectionStatus(
  status: boolean,
  lastSeen: string,
  threshold: number
): ConnectionStatus {
  if (!status) return "offline";

  const now = Date.now();
  const last = new Date(lastSeen).getTime();

  if (Number.isNaN(last)) return "offline";

  if (now - last > threshold) return "stale";

  return "online";
}

export function ConnectionIndicator({
  status,
  lastSeen,
  staleThresholdMs = 900_000,
  size = 8,
  showText = false,
}: ConnectionIndicatorProps) {
  const connectionStatus = useMemo(() => {
    return getConnectionStatus(status, lastSeen, staleThresholdMs);
  }, [status, lastSeen, staleThresholdMs]);

  const config = {
    online: {
      color: "bg-green-500",
      label: "在线",
    },
    stale: {
      color: "bg-yellow-500",
      label: "延迟",
    },
    offline: {
      color: "bg-red-500",
      label: "离线",
    },
  }[connectionStatus];

  return (
    <div className="flex items-center gap-2">
      {/* dot */}
      <span
        className={`inline-block rounded-full ${config.color}`}
        style={{
          width: size,
          height: size,
        }}
        title={`${config.label} · lastSeen: ${lastSeen}`}
      />

      {/* optional text */}
      {showText && <span className="text-xs text-slate-600">{config.label}</span>}
    </div>
  );
}
