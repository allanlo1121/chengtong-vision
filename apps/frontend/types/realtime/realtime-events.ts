// /types/realtime/realtime-event.ts
export type RealtimeEventType =
  | "tunnels_changed"
  | "tbm_connectivity_changed"
  | "tbm_assignment_changed";

export interface RealtimeEvent {
  /** 事件类型（语义） */
  type: RealtimeEventType;

  /** 事件发生时间（确保每次唯一） */
  at: number;

  /** 可选：来源 */
  source?: "supabase" | "system" | "manual";

  /** 可选：附加信息 */
  payload?: Record<string, any>;
}
