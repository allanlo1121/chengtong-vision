import * as thresholdService from '../services/thresholdService.js';
import { getAllTbmMetadata, getAllParameterMetadata } from '../datastore/metadataStore.js';

const key = process.argv[2] || '62de7539';

(async () => {
    try {
        console.log('Inspecting tbmKey=', key);
        const cached = thresholdService.getCachedForTbm(key);
        console.log('cached present?', !!cached);

        const got = await thresholdService.getMergedThresholdsForTbm(key);
        console.log('got keys count', got ? Object.keys(got).length : 0);

        const tbmMeta = getAllTbmMetadata();
        const matched = tbmMeta.entries.find(
            (e) => e.tbm_id === key || e.tbmcode === key || e.tbm_id?.slice(0, 8) === key || e.tbmcode?.slice(0, 8) === key
        ) || null;
        console.log('matched tbm?', !!matched);

        const paramMeta = getAllParameterMetadata();
        const sample = Object.keys(got || {}).slice(0, 5).map((code) => ({ code, meta: paramMeta.entries.find((p) => p.id === code) || null }));
        console.log('sample', JSON.stringify(sample, null, 2));

        // print one param fully if exists
        const one = Object.keys(got || {})[0];
        if (one) {
            console.log('one param full:', JSON.stringify({ [one]: got[one] }, null, 2));
        }
    } catch (err) {
        console.error('inspect error', err);
        process.exitCode = 1;
    }
})();
