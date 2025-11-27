export const AlarmType = {
  CONNECTIVITY: "CONNECTIVITY",
  GUIDANCE: "GUIDANCE",
  ADVANCE: "ADVANCE",
  SAFETY: "SAFETY",
} as const;

export type AlarmType = typeof AlarmType[keyof typeof AlarmType];
