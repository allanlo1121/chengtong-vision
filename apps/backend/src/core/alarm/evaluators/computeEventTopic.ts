

import { ActiveStaticState } from "../types/ActiveState";
import { Severity } from "../types/Severity";

export function computeEventTopic(prev: ActiveStaticState | null, next: ActiveStaticState): string | null {

    // console.log("computeEventTopic next", next.value, next.severity, next.level);
    if (!prev) {
        if (next.severity === Severity.Normal)
            return null;
        else return "alarm/start";
    }
    // console.log("computeEventTopic prev", prev.value, prev.severity, prev.level);
    const MIN_DELTA = 10;

    const delta = Math.abs(prev.value - next.value);
    const severityChanged = next.severity > prev.severity;
    const levelChanged = prev.level !== next.level;

    if (next.severity === Severity.Normal && prev.severity !== Severity.Normal)
        return "alarm/end";

    if (severityChanged)
        return "alarm/update";

    if (next.severity === Severity.Critical && Math.abs(next.value) > 120) {
        return "alarm/update";
    }

    return null;
}