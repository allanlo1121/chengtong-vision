"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDateString = toDateString;
exports.parseDateString = parseDateString;
const date_fns_1 = require("date-fns");
function toDateString(date) {
  return (0, date_fns_1.format)(date, "yyyy-MM-dd");
}
function parseDateString(value) {
  return value;
}
