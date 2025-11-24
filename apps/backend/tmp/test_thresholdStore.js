async function main() {
    // If SUPABASE env not provided, print example and exit
    // if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    //     console.log('SUPABASE_URL or SUPABASE_KEY not set. Printing example crec988 threshold structure for local inspection:\n');
    //     const example = {
    //         "s100206003": {
    //             name: "前点偏差X",
    //             baseline_lower: -50,
    //             baseline_upper: 50,
    //             alert_lower: -50,
    //             alert_upper: 50,
    //             alert_upper_upper: 80,
    //             alert_lower_lower: -80
    //         },
    //         "s100206004": {
    //             name: "前点偏差Y",
    //             baseline_lower: -50,
    //             baseline_upper: 50,
    //             alert_lower: -50,
    //             alert_upper: 50,
    //             alert_upper_upper: 80,
    //             alert_lower_lower: -80
    //         },
    //         "s100206006": {
    //             name: "后点偏差X",
    //             baseline_lower: -50,
    //             baseline_upper: 50,
    //             alert_lower: -50,
    //             alert_upper: 50,
    //             alert_upper_upper: 80,
    //             alert_lower_lower: -80
    //         },
    //         "s100206007": {
    //             name: "后点偏差Y",
    //             baseline_lower: -50,
    //             baseline_upper: 50,
    //             alert_lower: -50,
    //             alert_upper: 50,
    //             alert_upper_upper: 80,
    //             alert_lower_lower: -80
    //         }
    //     };
    //     console.log(JSON.stringify(example, null, 2));
    //     console.log('\nTo execute real DB queries, set SUPABASE_URL and SUPABASE_KEY and re-run:');
    //     console.log('  SUPABASE_URL=... SUPABASE_KEY=... node tmp/test_thresholdStore.js crec988 123');
    //     return;
    // }

    // dynamic import only when env is present
    try {
        const mod = await import('../datastore/thresholdStore.js');
        const { getBaseThresholds, getThresholdsForTbm, getThresholdForTbmParam } = mod;

        const tbm = process.argv[2] || 'crec988';
        const paramId = process.argv[3] ? Number(process.argv[3]) : 123;

        // console.log(`Testing getBaseThresholds('default') and getThresholdsForTbm('${tbm}')...`);

        // const base = typeof getBaseThresholds === 'function' ? await getBaseThresholds('default') : null;
        // console.log('getBaseThresholds(default) result:', JSON.stringify(base, null, 2));

        // const crec = typeof getBaseThresholds === 'function' ? await getBaseThresholds('crec988') : null;
        // console.log("getBaseThresholds('crec988') result:", JSON.stringify(crec, null, 2));

        const t1 = typeof getThresholdsForTbm === 'function' ? await getThresholdsForTbm(tbm) : null;
        console.log(`getThresholdsForTbm('${tbm}') result:`, JSON.stringify(t1, null, 2));

        // console.log(`\nTesting getThresholdForTbmParam('${tbm}', ${paramId})...`);
        // const t2 = typeof getThresholdForTbmParam === 'function' ? await getThresholdForTbmParam(tbm, paramId) : null;
        // console.log('getThresholdForTbmParam result:', JSON.stringify(t2, null, 2));
    } catch (err) {
        console.error('Error while testing thresholdStore (DB query):', err && err.message ? err.message : err);
    }
}

main();
