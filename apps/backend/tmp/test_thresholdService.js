import thresholdService from '../services/thresholdService.js';

async function main() {
    try {
        const res = await thresholdService.getMergedThresholdsForTbm('0dac924b-8878-4e8b-8148-b2c7c99760d9');
        console.log('thresholdService result:', JSON.stringify(res, null, 2));
    } catch (e) {
        console.error('error', e);
    }
}

main();
