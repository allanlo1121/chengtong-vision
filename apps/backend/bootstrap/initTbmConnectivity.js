import { getAllTbmMetadata } from "../datastore/metadataStore.js";
import {
    initializeConnectivitySnapshots,
    hydrateConnectivityCache,
    startConnectivityMonitoring,
} from "../services/tbmConnectivityService.js";

export const initTbmConnectivityTracking = async (monitorOptions = {}) => {
   // console.log("initTbmConnectivityTracking", monitorOptions);
    const { entries } = getAllTbmMetadata();
    if (!entries || !entries.length) {
        console.warn("[initTbmConnectivity] No TBM metadata entries found during initialization.");
    }

    await initializeConnectivitySnapshots(entries || []);
    await hydrateConnectivityCache();
   // console.log("startConnectivityMonitoring", monitorOptions);

    startConnectivityMonitoring(monitorOptions);
};

export default initTbmConnectivityTracking;
