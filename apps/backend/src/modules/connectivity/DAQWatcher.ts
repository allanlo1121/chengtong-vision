import { MetadataRegistry } from "../../metadata/MetadataRegistry.js";
import { ConnectivityService } from "./connectivity.service.js";

const lastSeen: Record<string, number> = {};
const TIMEOUT_MS = 3 * 60 * 1000; // 3 minutes
const systemStartAt = Date.now();

export const DAQConnectivityWatcher = {
  touch(tbmCode: string, ts: string) {
    lastSeen[tbmCode] = new Date(ts).getTime();
  },

  start() {
    setInterval(async () => {
      const now = Date.now();
      // console.log("DAQConnectivityWatcher checking at", new Date(now).toISOString());
      const activeTbmCodes = MetadataRegistry.tbmContexts.getActiveTbmCodes();
      for (const tbmCode of activeTbmCodes) {
        const last = lastSeen[tbmCode] ?? systemStartAt;
        if (now - last > TIMEOUT_MS) {
          await ConnectivityService.handleStatusUpdate({
            tbmCode,
            paramCode: "n010000002",
            status: false,
            source: "DAQ",
            recordedAt: new Date().toISOString(),
          });
        }
      }
    }, 5000);
  },
};
