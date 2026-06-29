"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setStatSettings = setStatSettings;
exports.getStatSettings = getStatSettings;
exports.getCurrentStatPeriodSettings = getCurrentStatPeriodSettings;
exports.loadStatSettings = loadStatSettings;
const pg_pool_1 = require("../../db/pg.pool");
const mapper_1 = require("./mapper");
let statSettings;
function setStatSettings(settings) {
  statSettings = settings;
}
function getStatSettings() {
  if (!statSettings) {
    throw new Error("Stat settings not initialized");
  }
  return statSettings;
}
async function getCurrentStatPeriodSettings() {
  const result = await pg_pool_1.pgPool.query(`
    select *
    from public.stat_period_settings
    where code = 'tunnel_progress'
      and effective_to is null
    limit 1
  `);
  return (0, mapper_1.toStatPeriodSettings)(result.rows[0]);
}
async function loadStatSettings() {
  statSettings = await getCurrentStatPeriodSettings();
}
