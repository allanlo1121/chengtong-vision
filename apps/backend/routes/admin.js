import express from 'express';
import * as thresholdService from '../services/thresholdService.js';
import { getMergedCacheSnapshot } from '../services/thresholdService.js';
import { getAllTbmMetadata, getAllParameterMetadata } from '../datastore/metadataStore.js';

const router = express.Router();

// thresholds snapshot (summary + full snapshot)
router.get('/threshold-cache', (req, res) => {
    console.log("/threshold-cache no tbmKey");
    
    try {
        const snap = getMergedCacheSnapshot();
        res.json({
            keys: Object.keys(snap).length,
            sampleKeys: Object.keys(snap).slice(0, 50),
            snapshot: snap,
        });
    } catch (err) {
        res.status(500).json({ error: String(err) });
    }
});

// single TBM thresholds
router.get('/threshold-cache/:tbmKey', async (req, res) => {
    console.log("start getthreshold");
    
    try {
        const { tbmKey } = req.params;
        let perParam = thresholdService.getCachedForTbm(tbmKey);
        if (!perParam) perParam = await thresholdService.getMergedThresholdsForTbm(tbmKey);

        const tbmMeta = getAllTbmMetadata();
        const matchedTbm = tbmMeta.entries.find(
            (e) => e.tbm_id === tbmKey || e.tbmcode === tbmKey || e.tbm_id?.slice(0, 8) === tbmKey || e.tbmcode?.slice(0, 8) === tbmKey
        ) || null;

        const paramMeta = getAllParameterMetadata();
        const sampleParams = Object.keys(perParam || {}).slice(0, 5).map((code) => ({ code, meta: paramMeta.entries.find((p) => p.id === code) || null }));

        console.log('[admin] /threshold-cache/:tbmKey response', {
            key: tbmKey,
            size: perParam ? Object.keys(perParam).length : 0,
            sample: perParam ? Object.fromEntries(Object.entries(perParam).slice(0, 5)) : null,
        });

        res.json({ key: tbmKey, perParam: perParam || null, tbmMeta: matchedTbm, paramSample: sampleParams });
    } catch (err) {
        res.status(500).json({ error: String(err) });
    }
});

// TBM metadata list
router.get('/tbmmeta-cache', (req, res) => {
    try {
        const tbmMetaSnap = getAllTbmMetadata();
        res.json({ keys: tbmMetaSnap.entries.length, sample: tbmMetaSnap.entries.slice(0, 50), snapshot: tbmMetaSnap });
    } catch (err) {
        res.status(500).json({ error: String(err) });
    }
});

// single TBM metadata
router.get('/tbmmeta-cache/:tbmKey', (req, res) => {
    try {
        const { tbmKey } = req.params;
        const tbmMetaSnap = getAllTbmMetadata();
        const matched = tbmMetaSnap.entries.find(
            (e) => e.tbm_id === tbmKey || e.tbmcode === tbmKey || e.tbm_id?.slice(0, 8) === tbmKey || e.tbmcode?.slice(0, 8) === tbmKey
        ) || null;
        res.json({ key: tbmKey, tbm: matched });
    } catch (err) {
        res.status(500).json({ error: String(err) });
    }
});

export default router;
