export class ParameterExtractor {
  static extract(tbmId: string, payload: any, recordedAt: string) {
    const list = [];

    for (const [paramCode, value] of Object.entries(payload)) {
      if (typeof value !== "number") continue;

      list.push({
        tbmId,
        paramCode,
        value,
        recordedAt,
      });
    }

    return list;
  }
}
