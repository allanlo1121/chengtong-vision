import thresholdService from '../services/thresholdService.js';

async function main() {
    try {
        const tbmId = process.argv[2] || 'bf6e5c82-92f4-4ded-ba64-c8b7e9cce06d';
        const res = await thresholdService.getMergedThresholdsForTbm(tbmId);
        console.log(JSON.stringify(res, null, 2));
    } catch (e) {
        console.error('error', e);
        process.exit(1);
    }
}

main();
