export interface RingEfficiencyToolQuery {
  date: string;
  startAt: string;
  endAt: string;
  viewStartAt: string;
  viewEndAt: string;
}

export function resolveRingEfficiencyToolQuery(
  searchParams: Record<string, string | string[] | undefined>
): RingEfficiencyToolQuery {
  const date = getStringParam(searchParams.date) ?? getTodayDateString();

  const { startAt, endAt, viewStartAt, viewEndAt } = getWorkDayRangeByDate(date);

  return {
    date,
    startAt,
    endAt,
    viewStartAt,
    viewEndAt,
  };
}

function getStringParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

/**
 * 输入 2026-05-28
 * 返回：
 * startAt = 2026-05-27T11:00:00.000Z
 * endAt   = 2026-05-28T11:00:00.000Z
 */
export function getWorkDayRangeByDate(date: string) {
  const end = new Date(`${date}T19:00:00+08:00`);
  const start = new Date(end);

  start.setDate(start.getDate() - 1);

  const now = new Date();
  const realEnd = now < end ? now : end;

  return {
    startAt: start.toISOString(),
    endAt: realEnd.toISOString(),

    // 给 timeline 展示用，仍然展示到 19:00
    viewStartAt: start.toISOString(),
    viewEndAt: end.toISOString(),
  };
}

function getTodayDateString() {
  const now = new Date();

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(now);
}
