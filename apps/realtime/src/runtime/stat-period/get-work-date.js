"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkDate = getWorkDate;
const date_fns_tz_1 = require("date-fns-tz");
const stat_settings_cache_1 = require("./stat-settings-cache");
function getWorkDate(recordedAt) {
  const settings = (0, stat_settings_cache_1.getStatSettings)();
  const zonedDate = (0, date_fns_tz_1.toZonedTime)(recordedAt, settings.timezone);
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
