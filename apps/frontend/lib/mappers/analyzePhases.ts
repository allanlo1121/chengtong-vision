type PhaseType = "jue" | "pin" | "idle" | "offline";

type PhaseRecord = {
  phase: string;
  duration_seconds: number;
  ring?: number;
};

type Duration = {
  phase: PhaseType;
  seconds: number;
};

type PhaseStats = {
  phaseDurations: Duration[];
  totalSeconds: number;
  totalRings: number;
  ringRange: { min: number; max: number } | null;
};

export function analyzePhases(data: PhaseRecord[]): PhaseStats {
  const durationMap: Record<PhaseType, number> = {
    jue: 0,
    pin: 0,
    idle: 0,
    offline: 0,
  };

  const ringSet = new Set<number>();
  let totalSeconds = 0;

  for (const record of data) {
    const { phase, duration_seconds, ring } = record;

    if (["jue", "pin", "idle", "offline"].includes(phase)) {
      const typedPhase = phase as PhaseType;
      durationMap[typedPhase] += duration_seconds;
      totalSeconds += duration_seconds;

      if (typedPhase === "jue" && typeof ring === "number") {
        ringSet.add(ring);
      }
    }
  }

  const phaseDurations: Duration[] = Object.entries(durationMap).map(([phase, seconds]) => ({
    phase: phase as PhaseType,
    seconds,
  }));

  const ringNumbers = Array.from(ringSet).sort((a, b) => a - b);
  const ringRange = ringNumbers.length
    ? { min: ringNumbers[0], max: ringNumbers[ringNumbers.length - 1] }
    : null;

  return {
    phaseDurations,
    totalSeconds,
    totalRings: ringSet.size,
    ringRange,
  };
}
