import { publishEvent, getBus } from '../eventbus/eventBus.js';
import { initDbListener } from './guidanceEventBus.dbListener.js';
import { initNotifyListener } from './guidanceEventBus.notifyListener.js';

// Backwards-compatible wrapper that publishes to the generic event bus
export const publishGuidanceEvent = (event) => publishEvent('alerts.guidance', event);

export const initGuidanceEventBus = (opts = {}) => {
    const bus = getBus();
    initDbListener(bus, opts);
    initNotifyListener(bus, opts);
};

export default getBus();
