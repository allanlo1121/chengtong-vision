"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toStatPeriodSettings = toStatPeriodSettings;
function toStatPeriodSettings(row) {
  return {
    code: row.code,
    dayCutoffTime: row.day_cutoff_time,
    weekStartDow: Number(row.week_start_dow),
    monthStartDay: Number(row.month_start_day),
    timezone: row.timezone,
  };
}
