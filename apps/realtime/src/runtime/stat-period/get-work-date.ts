import { toZonedTime } from "date-fns-tz";
import { getStatSettings } from "./stat-settings-cache";

export function getWorkDate(recordedAt: string): Date {
  const settings = getStatSettings();

  const zonedDate = toZonedTime(recordedAt, settings.timezone);

  const [cutoffHour, cutoffMinute] = settings.dayCutoffTime.split(":").map(Number);

  const currentMinutes = zonedDate.getHours() * 60 + zonedDate.getMinutes();

  const cutoffMinutes = cutoffHour * 60 + cutoffMinute;

  const workDate = new Date(zonedDate);

  if (currentMinutes >= cutoffMinutes) {
    workDate.setDate(workDate.getDate() + 1);
  }

  workDate.setHours(0, 0, 0, 0);

  return workDate;
}
